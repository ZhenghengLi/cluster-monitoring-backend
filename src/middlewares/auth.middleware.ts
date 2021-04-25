import { Middleware, HttpErrors } from "@loopback/rest";

const passWord = "xxxx";

export const staticAuth: Middleware = async (ctx, next) => {
    const auth = ctx.request.header("authorization");
    if (auth === passWord) {
        const result = await next();
        return result;
    } else {
        throw new HttpErrors.Unauthorized();
    }
};
