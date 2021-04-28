import { inject } from "@loopback/core";
import { DefaultCrudRepository } from "@loopback/repository";
import { ClusterMonitoringDataSource } from "../datasources";
import { NodeGpuLoad, NodeGpuLoadRelations } from "../models";

export class NodeGpuLoadRepository extends DefaultCrudRepository<
    NodeGpuLoad,
    typeof NodeGpuLoad.prototype.id,
    NodeGpuLoadRelations
> {
    constructor(@inject("datasources.cluster_monitoring") dataSource: ClusterMonitoringDataSource) {
        super(NodeGpuLoad, dataSource);
    }
}
