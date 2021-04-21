// Uncomment these imports to begin using these cool features!

// import {inject} from '@loopback/core';
import { get, post, requestBody } from "@loopback/rest";

export class UserCpuMemController {
    constructor() {}
    @post("/user-cpu-mem")
    async create(
        @requestBody({
            content: { "application/json": {} },
        })
        data: Object
    ) {
        console.log(data);
        return data;
    }

    @get("/user-cpu-mem")
    async find() {
        return "none";
    }
}
