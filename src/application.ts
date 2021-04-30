import { BootMixin } from "@loopback/boot";
import { ApplicationConfig, createBindingFromClass } from "@loopback/core";
import { RepositoryMixin } from "@loopback/repository";
import { RestApplication } from "@loopback/rest";
import { RestExplorerBindings, RestExplorerComponent } from "@loopback/rest-explorer";
import { ServiceMixin } from "@loopback/service-proxy";
import path from "path";
import { MySequence } from "./sequence";
import { AuthenticationComponent, registerAuthenticationStrategy } from "@loopback/authentication";
import { StaticAuthenticationStrategy } from "./authentication";
import { UserCpuMemRepository, NodeCpuLoadRepository, NodeGpuLoadRepository } from "./repositories";
import { SecuritySpecEnhancer } from "./security";

export { ApplicationConfig };

export class ClusterMonitoringApplication extends BootMixin(ServiceMixin(RepositoryMixin(RestApplication))) {
    constructor(options: ApplicationConfig = {}) {
        super(options);

        // Set up the custom sequence
        this.sequence(MySequence);

        // Set up default home page
        this.static("/", path.join(__dirname, "../public"));

        // Customize @loopback/rest-explorer configuration here
        this.configure(RestExplorerBindings.COMPONENT).to({
            path: "/explorer",
        });
        this.component(RestExplorerComponent);

        // authentication
        this.component(AuthenticationComponent);
        registerAuthenticationStrategy(this, StaticAuthenticationStrategy);

        // secrity
        this.add(createBindingFromClass(SecuritySpecEnhancer));

        // repository
        this.repository(UserCpuMemRepository);
        this.repository(NodeCpuLoadRepository);
        this.repository(NodeGpuLoadRepository);

        this.projectRoot = __dirname;
        // Customize @loopback/boot Booter Conventions here
        this.bootOptions = {
            controllers: {
                // Customize ControllerBooter Conventions here
                dirs: ["controllers"],
                extensions: [".controller.js"],
                nested: true,
            },
        };
    }
}
