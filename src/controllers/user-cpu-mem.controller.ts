// Uncomment these imports to begin using these cool features!

// import {inject} from '@loopback/core';
import { get, post, param, requestBody, SchemaObject } from "@loopback/rest";
import { authenticate } from "@loopback/authentication";
import { repository, Filter } from "@loopback/repository";
import { UserCpuMemRepository } from "../repositories";
import { UserCpuMem } from "../models";

const schemaNodeUtil: SchemaObject = {
    title: "NodeUtil",
    type: "object",
    properties: {
        node: { type: "string" },
        data: {
            type: "array",
            items: {
                title: "UserUtil",
                type: "object",
                properties: {
                    user: { type: "string" },
                    util: {
                        type: "object",
                        properties: {
                            cpu: { type: "number" },
                            mem: { type: "number" },
                        },
                        required: ["cpu", "mem"],
                        additionalProperties: false,
                    },
                },
                required: ["user", "util"],
                additionalProperties: false,
            },
        },
    },
    required: ["node", "data"],
    additionalProperties: false,
};

type UserUtil = {
    user: string;
    util: {
        cpu: number;
        mem: number;
    };
};

type NodeUtil = {
    node: string;
    data: UserUtil[];
};

export class UserCpuMemController {
    constructor(@repository(UserCpuMemRepository) private userCpuMemRepo: UserCpuMemRepository) {}

    @authenticate("static")
    @post("/user-cpu-mem")
    async create(@requestBody.array(schemaNodeUtil) data: NodeUtil[]): Promise<UserCpuMem[]> {
        const currentTime = new Date().getTime();

        const entries: UserCpuMem[] = [];
        for (const x of data) {
            if (x.data.length < 1) continue;
            const node = x.node;
            for (const y of x.data) {
                const entry = new UserCpuMem();
                entry.time = currentTime;
                entry.node = node;
                entry.user = y.user;
                entry.cpu = y.util.cpu;
                entry.mem = y.util.mem;
                entries.push(entry);
            }
        }

        return this.userCpuMemRepo.createAll(entries);
    }

    @get("/user-cpu-mem")
    async find(@param.filter(UserCpuMem) filter?: Filter<UserCpuMem>): Promise<UserCpuMem[]> {
        return this.userCpuMemRepo.find(filter);
    }
}
