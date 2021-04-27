// Uncomment these imports to begin using these cool features!

// import {inject} from '@loopback/core';
import { get, post, requestBody, SchemaObject } from "@loopback/rest";
import { repository } from "@loopback/repository";
import { UserCpuMemRepository } from "../repositories";

const schemaNodeUtil: SchemaObject = {
    type: "object",
    properties: {
        node: { type: "string" },
        data: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    user: { type: "string" },
                    util: {
                        type: "object",
                        properties: {
                            cpu: { type: "number" },
                            mem: { type: "number" },
                        },
                    },
                },
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
    @post("/user-cpu-mem")
    async create(@requestBody.array(schemaNodeUtil) data: NodeUtil[]) {
        console.log(data);
        return data;
    }

    @get("/user-cpu-mem")
    async find() {
        return "none";
    }
}
