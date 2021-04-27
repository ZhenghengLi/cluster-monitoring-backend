// Uncomment these imports to begin using these cool features!

// import {inject} from '@loopback/core';
import { get, post, requestBody } from "@loopback/rest";
import { repository } from "@loopback/repository";
import { UserCpuMemRepository } from "../repositories";

export class UserCpuMemController {
    constructor(@repository(UserCpuMemRepository) private userCpuMemRepo: UserCpuMemRepository) {}
    @post("/user-cpu-mem")
    async create(@requestBody.array({}) data: Object[]) {
        console.log(data);
        return data;
    }

    @get("/user-cpu-mem")
    async find() {
        return "none";
    }
}
