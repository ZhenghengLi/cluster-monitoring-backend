import { inject, lifeCycleObserver, LifeCycleObserver } from "@loopback/core";
import { juggler } from "@loopback/repository";

const config = {
    name: "cluster_monitoring",
    connector: "postgresql",
    host: process.env.POSTGRESQL_HOST ?? "/var/run/postgresql",
    port: process.env.POSTGRESQL_PORT ?? 5432,
    user: process.env.POSTGRESQL_USER ?? "cluster_monitoring",
    password: process.env.POSTGRESQL_PASSWORD,
    database: process.env.POSTGRESQL_DATABASE ?? "cluster_monitoring",
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver("datasource")
export class ClusterMonitoringDataSource extends juggler.DataSource implements LifeCycleObserver {
    static dataSourceName = "cluster_monitoring";
    static readonly defaultConfig = config;

    constructor(
        @inject("datasources.config.cluster_monitoring", { optional: true })
        dsConfig: object = config
    ) {
        super(dsConfig);
    }
}
