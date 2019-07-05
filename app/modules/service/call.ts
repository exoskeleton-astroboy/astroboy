import { AstroboyContext, Bundles } from "@exoskeleton/core";
import { Constructor } from "@bonbons/di";
import { DubboConfig, IAjaxOptions, AjaxConfig } from "@typings/service";
import { Service } from "astroboy";

/**
 * ## 定义了YouzanFramework的基础service能力
 * @description
 * @author Big Mogician
 * @export
 * @interface CallService
 */
export interface CallService {
  /**
   * 集成 trace 调用 dubbo 接口
   * @description
   * @author Big Mogician
   * @template T
   * @param {string} serviceName
   * @param {string} methodName
   * @param {any[]} args
   * @param {DubboConfig} [config]
   * @returns {Promise<T>}
   * @memberof CallService
   */
  dubboCall<T = any>(
    serviceName: string,
    methodName: string,
    args: any[],
    config?: DubboConfig
  ): Promise<T>;
  /**
   * 通用 ajax 接口调用, 集成 trace && sc
   * @description
   * @author Big Mogician
   * @template T
   * @param {IAjaxOptions} ajaxOptions
   * @param {AjaxConfig} config
   * @returns {Promise<T>}
   * @memberof CallService
   */
  httpCall<T = any>(ajaxOptions: IAjaxOptions, config: AjaxConfig): Promise<T>;
  /**
   * 通过 proxy 调用 http 接口. 对应 config 字段为 "PROXY_URL"
   * @description
   * @author Big Mogician
   * @template T
   * @param {IAjaxOptions} ajaxOptions
   * @param {AjaxConfig} config
   * @returns {Promise<T>}
   * @memberof CallService
   */
  proxyCall<T = any>(ajaxOptions: IAjaxOptions, config: AjaxConfig): Promise<T>;
}

export const CallService: Constructor<
  CallService
> = class CallService {} as any;

Bundles.scoped(CallService, [
  [AstroboyContext],
  (context: AstroboyContext) => new Service(<any>context.ctx)
]);
