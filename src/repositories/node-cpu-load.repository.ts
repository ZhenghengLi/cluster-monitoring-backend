import { inject } from "@loopback/core";
import { DefaultCrudRepository } from "@loopback/repository";
import { ClusterMonitoringDataSource } from "../datasources";
import { NodeCpuLoad, NodeCpuLoadRelations } from "../models";

export class NodeCpuLoadRepository extends DefaultCrudRepository<
    NodeCpuLoad,
    typeof NodeCpuLoad.prototype.id,
    NodeCpuLoadRelations
> {
    constructor(@inject("datasources.cluster_monitoring") dataSource: ClusterMonitoringDataSource) {
        super(NodeCpuLoad, dataSource);
    }
}
