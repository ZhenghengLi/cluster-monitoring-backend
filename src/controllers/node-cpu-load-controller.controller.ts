import { get, post, param, requestBody, SchemaObject } from "@loopback/rest";
import { authenticate } from "@loopback/authentication";
import { repository, Filter } from "@loopback/repository";
import { NodeCpuLoadRepository } from "../repositories";
import { NodeCpuLoad } from "../models";

const schemaCpuLoad: SchemaObject = {};

export class NodeCpuLoadControllerController {
    constructor(@repository(NodeCpuLoadRepository) private nodeCpuLoadRepo: NodeCpuLoadRepository) {}

    @authenticate("static")
    @post("/node-cpu-load")
    async create(@requestBody.array(schemaCpuLoad) data: Object[]): Promise<NodeCpuLoad[]> {
        // const currentTime = new Date().getTime();
        console.log(data);
        return [];
    }

    @authenticate("static")
    @get("/node-cpu-load")
    async find(@param.filter(NodeCpuLoad) filter?: Filter<NodeCpuLoad>): Promise<NodeCpuLoad[]> {
        return [];
    }
}
