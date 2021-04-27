import { inject } from "@loopback/core";
import { DefaultCrudRepository } from "@loopback/repository";
import { ClusterMonitoringDataSource } from "../datasources";
import { UserCpuMem, UserCpuMemRelations } from "../models";

export class UserCpuMemRepository extends DefaultCrudRepository<
    UserCpuMem,
    typeof UserCpuMem.prototype.id,
    UserCpuMemRelations
> {
    constructor(@inject("datasources.cluster_monitoring") dataSource: ClusterMonitoringDataSource) {
        super(UserCpuMem, dataSource);
    }
}
