import { AstroboyContext, Bundles } from "@exoskeleton/core";
import { Constructor } from "@bonbons/di";
import { Service } from "astroboy";

/**
 * ## 定义了YouzanFramework的基础service能力
 * @description
 * @author Big Mogician
 * @export
 * @interface CallService
 */
export interface CallService extends Service {}

export const CallService: Constructor<
  CallService
> = class CallService {} as any;

Bundles.scoped(CallService, [
  [AstroboyContext],
  (context: AstroboyContext) => new Service(<any>context.ctx)
]);
