import { get, post, param, requestBody, SchemaObject, response, getModelSchemaRef } from "@loopback/rest";
import { authenticate } from "@loopback/authentication";
import { repository, Filter } from "@loopback/repository";
import { NodeCpuLoadRepository } from "../repositories";
import { NodeCpuLoad } from "../models";

const schemaCpuLoad: SchemaObject = {
    title: "NodeCpuLoadData",
    type: "object",
    properties: {
        node: { type: "string" },
        data: {
            type: "object",
            properties: {
                user: { type: "number" },
                system: { type: "number" },
                idle: { type: "number" },
                iowait: { type: "number" },
                irq: { type: "number" },
                softirq: { type: "number" },
                steal: { type: "number" },
                guest: { type: "number" },
            },
            required: ["user", "system", "idle", "iowait", "irq", "softirq", "steal", "guest"],
            additionalProperties: false,
        },
    },
    required: ["node", "data"],
    additionalProperties: false,
};

type NodeCpuLoadData = {
    node: string;
    data: {
        user: number;
        system: number;
        idle: number;
        iowait: number;
        irq: number;
        softirq: number;
        steal: number;
        guest: number;
    };
};

export class NodeCpuLoadController {
    constructor(@repository(NodeCpuLoadRepository) private nodeCpuLoadRepo: NodeCpuLoadRepository) {}

    @authenticate("static")
    @post("/node-cpu-load")
    @response(200, {
        description: "Array of NodeCpuLoad model instances",
        content: {
            "application/json": {
                schema: {
                    type: "array",
                    items: getModelSchemaRef(NodeCpuLoad),
                },
            },
        },
    })
    async create(@requestBody.array(schemaCpuLoad) data: NodeCpuLoadData[]): Promise<NodeCpuLoad[]> {
        const currentTime = new Date().getTime();
        const entries: NodeCpuLoad[] = [];
        for (const x of data) {
            const entry = new NodeCpuLoad();
            entry.time = currentTime;
            entry.node = x.node;
            Object.assign(entry, x.data);
            entries.push(entry);
        }
        return this.nodeCpuLoadRepo.createAll(entries);
    }

    @authenticate("static")
    @get("/node-cpu-load")
    @response(200, {
        description: "Array of NodeCpuLoad model instances",
        content: {
            "application/json": {
                schema: {
                    type: "array",
                    items: getModelSchemaRef(NodeCpuLoad, { includeRelations: true }),
                },
            },
        },
    })
    async find(@param.filter(NodeCpuLoad) filter?: Filter<NodeCpuLoad>): Promise<NodeCpuLoad[]> {
        return this.nodeCpuLoadRepo.find(filter);
    }
}
