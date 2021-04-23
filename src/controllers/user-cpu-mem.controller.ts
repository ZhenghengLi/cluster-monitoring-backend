// Uncomment these imports to begin using these cool features!

// import {inject} from '@loopback/core';
import { get, post, requestBody, Request, RestBindings } from "@loopback/rest";
import { inject } from "@loopback/core";

export class UserCpuMemController {
    constructor(@inject(RestBindings.Http.REQUEST) private req: Request) {}
    @post("/user-cpu-mem")
    async create(@requestBody() data: Object) {
        console.log(data);
        return data;
    }

    @get("/user-cpu-mem")
    async find() {
        return "none";
    }
}
