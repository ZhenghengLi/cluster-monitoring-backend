import { AuthenticationStrategy } from "@loopback/authentication";
import { Request, HttpErrors } from "@loopback/rest";
import { UserProfile, securityId } from "@loopback/security";

const passWord = process.env.PASSWORD ?? "xxxx";

export class StaticAuthenticationStrategy implements AuthenticationStrategy {
    name = "static";
    async authenticate(request: Request): Promise<UserProfile | undefined> {
        const auth = request.header("authorization");
        if (auth === passWord) {
            return { [securityId]: "ok" };
        } else {
            throw new HttpErrors.Unauthorized();
        }
    }
}
