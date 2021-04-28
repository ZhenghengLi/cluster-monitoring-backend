import { Entity, model, property } from "@loopback/repository";

@model({
    settings: {
        postgresql: { schema: "public", table: "node_gpu_load" },
    },
})
export class NodeGpuLoad extends Entity {
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
        type: "string",
        required: true,
        postgresql: {
            dataType: "varchar(20)",
        },
    })
    busid: string;

    @property({
        type: "number",
        required: true,
        postgresql: {
            dataType: "real",
        },
    })
    gpu: number;

    @property({
        type: "number",
        required: true,
        postgresql: {
            dataType: "real",
        },
    })
    mem: number;

    constructor(data?: Partial<NodeGpuLoad>) {
        super(data);
    }
}

export interface NodeGpuLoadRelations {
    // describe navigational properties here
}

export type NodeGpuLoadWithRelations = NodeGpuLoad & NodeGpuLoadRelations;
