import { Entity, model, property } from "@loopback/repository";

@model({
    settings: {
        postgresql: { schema: "public", table: "user_cpu_mem" },
    },
})
export class UserCpuMem extends Entity {
    @property({
        id: true,
        type: "number",
        generated: true,
    })
    id?: number;

    @property({
        type: "number",
        required: true,
        postgresql: {
            dataType: "bigint",
        },
    })
    time: number; // unix timestamp in millisecond

    @property({
        type: "string",
        required: true,
        postgresql: {
            dataType: "varchar(60)",
        },
    })
    node: string;

    @property({
        type: "string",
        required: true,
        postgresql: {
            dataType: "varchar(40)",
        },
    })
    user: string;

    @property({
        type: "number",
        required: true,
        postgresql: {
            dataType: "real",
        },
    })
    cpu: number;

    @property({
        type: "number",
        required: true,
        postgresql: {
            dataType: "real",
        },
    })
    mem: number;

    constructor(data?: Partial<UserCpuMem>) {
        super(data);
    }
}

export interface UserCpuMemRelations {
    // describe navigational properties here
}

export type UserCpuMemWithRelations = UserCpuMem & UserCpuMemRelations;
