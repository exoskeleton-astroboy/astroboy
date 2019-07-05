import { serverInit, IMiddlewaresScope, injectScope } from "@exoskeleton/core";
function entry({ ctx, next }) {
    return serverInit(ctx, next);
}
export = (options: any = {}, app: any) => async (ctx: any, next: any) => {
    return await entry(({ ctx, options, app, next } as any));
};
