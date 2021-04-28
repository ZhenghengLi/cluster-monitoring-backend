import { get, post, param, requestBody, SchemaObject } from "@loopback/rest";
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
                title: "NodeGpuLoadCard",
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

type NodeGpuLoadCard = {
    busid: string;
    util: {
        gpu: number;
        mem: number;
    };
};

type NodeGpuLoadData = {
    node: string;
    data: NodeGpuLoadCard[];
};

export class NodeGpuLoadController {
    constructor(@repository(NodeGpuLoadRepository) private nodeGpuLoadRepo: NodeGpuLoadRepository) {}

    @authenticate("static")
    @post("/node-gpu-load")
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

    @authenticate("static")
    @get("/node-gpu-load")
    async find(@param.filter(NodeGpuLoad) filter?: Filter<NodeGpuLoad>): Promise<NodeGpuLoad[]> {
        return this.nodeGpuLoadRepo.find(filter);
    }
}
