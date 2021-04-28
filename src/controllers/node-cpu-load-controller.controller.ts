import { get, post, param, requestBody, SchemaObject } from "@loopback/rest";
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

export class NodeCpuLoadControllerController {
    constructor(@repository(NodeCpuLoadRepository) private nodeCpuLoadRepo: NodeCpuLoadRepository) {}

    @authenticate("static")
    @post("/node-cpu-load")
    async create(@requestBody.array(schemaCpuLoad) data: NodeCpuLoadData[]): Promise<NodeCpuLoad[]> {
        const currentTime = new Date().getTime();
        const entries: NodeCpuLoad[] = [];
        for (const x of data) {
            const entry = new NodeCpuLoad();
            entry.time = currentTime;
            entry.node = x.node;
            entry.user = x.data.user;
            entry.system = x.data.system;
            entry.idle = x.data.idle;
            entry.iowait = x.data.iowait;
            entry.irq = x.data.irq;
            entry.softirq = x.data.softirq;
            entry.steal = x.data.steal;
            entry.guest = x.data.guest;
            entries.push(entry);
        }
        return this.nodeCpuLoadRepo.createAll(entries);
    }

    @authenticate("static")
    @get("/node-cpu-load")
    async find(@param.filter(NodeCpuLoad) filter?: Filter<NodeCpuLoad>): Promise<NodeCpuLoad[]> {
        return [];
    }
}
