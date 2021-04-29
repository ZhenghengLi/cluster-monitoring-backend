import { get, post, param, requestBody, SchemaObject, response, getModelSchemaRef } from "@loopback/rest";
import { authenticate } from "@loopback/authentication";
import { repository, Filter } from "@loopback/repository";
import { UserCpuMemRepository } from "../repositories";
import { UserCpuMem } from "../models";

const schemaUserUtil: SchemaObject = {
    title: "UserCpuMemData",
    type: "object",
    properties: {
        node: { type: "string" },
        data: {
            type: "array",
            items: {
                title: "UserCpuMemOne",
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

type UserCpuMemOne = {
    user: string;
    util: {
        cpu: number;
        mem: number;
    };
};

type UserCpuMemData = {
    node: string;
    data: UserCpuMemOne[];
};

export class UserCpuMemController {
    constructor(@repository(UserCpuMemRepository) private userCpuMemRepo: UserCpuMemRepository) {}

    @authenticate("static")
    @post("/user-cpu-mem", {
        security: [{ password: [] }],
        responses: {
            "200": {
                description: "Array of UserCpuMem model instances",
                content: {
                    "application/json": {
                        schema: {
                            type: "array",
                            items: getModelSchemaRef(UserCpuMem),
                        },
                    },
                },
            },
        },
    })
    async create(@requestBody.array(schemaUserUtil) data: UserCpuMemData[]): Promise<UserCpuMem[]> {
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
                Object.assign(entry, y.util);
                entries.push(entry);
            }
        }

        return this.userCpuMemRepo.createAll(entries);
    }

    @get("/user-cpu-mem")
    @response(200, {
        description: "Array of UserCpuMem model instances",
        content: {
            "application/json": {
                schema: {
                    type: "array",
                    items: getModelSchemaRef(UserCpuMem, { includeRelations: true }),
                },
            },
        },
    })
    async find(@param.filter(UserCpuMem) filter?: Filter<UserCpuMem>): Promise<UserCpuMem[]> {
        if (filter) {
            return this.userCpuMemRepo.find(filter);
        } else {
            return [];
        }
    }
}
