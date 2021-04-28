import { Entity, model, property } from "@loopback/repository";

@model({
    settings: {
        postgresql: { schema: "public", table: "node_cpu_load" },
    },
})
export class NodeCpuLoad extends Entity {
    @property({
        type: "number",
        id: true,
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
        type: "number",
        required: true,
        postgresql: {
            dataType: "real",
        },
    })
    user: number;

    @property({
        type: "number",
        required: true,
        postgresql: {
            dataType: "real",
        },
    })
    system: number;

    @property({
        type: "number",
        required: true,
        postgresql: {
            dataType: "real",
        },
    })
    idle: number;

    @property({
        type: "number",
        required: true,
        postgresql: {
            dataType: "real",
        },
    })
    iowait: number;

    @property({
        type: "number",
        required: true,
        postgresql: {
            dataType: "real",
        },
    })
    irq: number;

    @property({
        type: "number",
        required: true,
        postgresql: {
            dataType: "real",
        },
    })
    softirq: number;

    @property({
        type: "number",
        required: true,
        postgresql: {
            dataType: "real",
        },
    })
    steal: number;

    @property({
        type: "number",
        required: true,
        postgresql: {
            dataType: "real",
        },
    })
    guest: number;

    constructor(data?: Partial<NodeCpuLoad>) {
        super(data);
    }
}

export interface NodeCpuLoadRelations {
    // describe navigational properties here
}

export type NodeCpuLoadWithRelations = NodeCpuLoad & NodeCpuLoadRelations;
