import { get, post, param, requestBody, SchemaObject } from "@loopback/rest";
import { authenticate } from "@loopback/authentication";
import { repository, Filter } from "@loopback/repository";
import { NodeGpuLoadRepository } from "../repositories";
import { NodeGpuLoad } from "../models";

const schemaGpuLoad: SchemaObject = {};

export class NodeGpuLoadControllerController {
    constructor(@repository(NodeGpuLoadRepository) private nodeGpuLoadRepo: NodeGpuLoadRepository) {}

    @authenticate("static")
    @post("/node-gpu-load")
    async create(@requestBody.array(schemaGpuLoad) data: Object[]): Promise<NodeGpuLoad[]> {
        // const currentTime = new Date().getTime();
        console.log(data);
        return [];
    }

    @authenticate("static")
    @get("/node-gpu-load")
    async find(@param.filter(NodeGpuLoad) filter?: Filter<NodeGpuLoad>): Promise<NodeGpuLoad[]> {
        return [];
    }
}
