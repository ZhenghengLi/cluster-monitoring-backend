import { ApplicationConfig, ClusterMonitoringApplication } from "./application";

export * from "./application";

export async function main(options: ApplicationConfig = {}) {
    const app = new ClusterMonitoringApplication(options);
    await app.boot();
    await app.start();

    const url = app.restServer.url;
    console.log(`Server is running at ${url}`);
    console.log(`Try ${url}/ping`);

    return app;
}

if (require.main === module) {
    // Run the application
    const config = {
        rest: {
            port: +(process.env.PORT ?? 3000),
            host: process.env.HOST,
            gracePeriodForClose: 5000, // 5 seconds
            openApiSpec: {
                servers: process.env.API_SERVER_URL ? [{ url: process.env.API_SERVER_URL }] : undefined,
                setServersFromRequest: !process.env.API_SERVER_URL,
            },
            basePath: process.env.API_SERVER_BASE_PATH,
        },
    };
    main(config).catch((err) => {
        console.error("Cannot start the application.", err);
        process.exit(1);
    });
}
