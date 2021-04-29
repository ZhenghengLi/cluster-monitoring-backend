import { injectable } from "@loopback/core";
import { mergeOpenAPISpec, asSpecEnhancer, OASEnhancer, OpenApiSpec, OpenAPIObject } from "@loopback/rest";

@injectable(asSpecEnhancer)
export class SecuritySpecEnhancer implements OASEnhancer {
    name = "security";
    modifySpec(spec: OpenApiSpec): OpenApiSpec {
        const securityPatchSpec: Partial<OpenAPIObject> = {
            components: {
                securitySchemes: {
                    password: {
                        type: "http",
                        scheme: "bearer",
                    },
                },
            },
            security: [{ password: [] }],
        };
        return mergeOpenAPISpec(spec, securityPatchSpec);
    }
}
