import { get, post, param, requestBody, SchemaObject, response, getModelSchemaRef } from "@loopback/rest";
import { authenticate } from "@loopback/authentication";
import { repository, Filter } from "@loopback/repository";
import { NodeGpuLoadRepository } from "../repositories";
import { NodeGpuLoad } from "../models";

const schemaGpuLoad: SchemaObject = {
    title: "NodeGpuLoadData",
    type: "object",
    properties: {
        node: { type: "string" },
        data: {
            type: "array",
            items: {
                title: "NodeGpuLoadOne",
                type: "object",
                properties: {
                    busid: { type: "string" },
                    util: {
                        type: "object",
                        properties: {
                            gpu: { type: "number" },
                            mem: { type: "number" },
                        },
                        required: ["gpu", "mem"],
                        additionalProperties: false,
                    },
                },
                required: ["busid", "util"],
                additionalProperties: false,
            },
        },
    },
    required: ["node", "data"],
    additionalProperties: false,
};

type NodeGpuLoadOne = {
    busid: string;
    util: {
        gpu: number;
        mem: number;
    };
};

type NodeGpuLoadData = {
    node: string;
    data: NodeGpuLoadOne[];
};

export class NodeGpuLoadController {
    constructor(@repository(NodeGpuLoadRepository) private nodeGpuLoadRepo: NodeGpuLoadRepository) {}

    @authenticate("static")
    @post("/node-gpu-load", {
        security: [{ password: [] }],
        responses: {
            "200": {
                description: "Array of NodeGpuLoad model instances",
                content: {
                    "application/json": {
                        schema: {
                            type: "array",
                            items: getModelSchemaRef(NodeGpuLoad),
                        },
                    },
                },
            },
        },
    })
    async create(@requestBody.array(schemaGpuLoad) data: NodeGpuLoadData[]): Promise<NodeGpuLoad[]> {
        const currentTime = new Date().getTime();

        const entries: NodeGpuLoad[] = [];
        for (const x of data) {
            if (x.data.length < 1) continue;
            const node = x.node;
            for (const y of x.data) {
                const entry = new NodeGpuLoad();
                entry.time = currentTime;
                entry.node = node;
                entry.busid = y.busid;
                Object.assign(entry, y.util);
                entries.push(entry);
            }
        }

        return this.nodeGpuLoadRepo.createAll(entries);
    }

    @get("/node-gpu-load")
    @response(200, {
        description: "Array of NodeGpuLoad model instances",
        content: {
            "application/json": {
                schema: {
                    type: "array",
                    items: getModelSchemaRef(NodeGpuLoad, { includeRelations: true }),
                },
            },
        },
    })
    async find(@param.filter(NodeGpuLoad) filter?: Filter<NodeGpuLoad>): Promise<NodeGpuLoad[]> {
        if (filter) {
            return this.nodeGpuLoadRepo.find(filter);
        } else {
            return [];
        }
    }
}
