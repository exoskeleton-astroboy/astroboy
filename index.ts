import path from "path";
import defaultFramework from "astroboy";
import { Constructor } from "@bonbons/di";
import {
  Server,
  JsonResolvers,
  RENDER_RESULT_OPTIONS,
  JSON_RESULT_OPTIONS
} from "@exoskeleton/core";
import { readFileString } from "@utils";
import { CoreConfigReader } from "@core/configs/config.default";
import { CoreContext } from "@modules/context";
import { CallService } from "@modules/service/call";

function bindDI(ctor: any) {
  if (!ctor) return undefined;
  // tslint:disable-next-line:class-name
  return class BIND_CLASS extends ctor {
    protected get [Symbol.for("BASE_DIR")]() {
      return path.join(__dirname, ".");
    }
  };
}

/**
 * ## EXO CoreFramework
 * * 默认使用astroboy来实现
 * @description
 * @author Big Mogician
 * @export
 * @class CoreFramework
 * @extends {YouzanFramework}
 */
export class CoreFramework extends defaultFramework {
  protected get [Symbol.for("BASE_DIR")]() {
    return path.join(__dirname, ".");
  }
}

/**
 * ## EXO Core DI服务启动程序
 * @description
 * @author Big Mogician
 * @export
 * @class Core
 * @extends {Server}
 */
export class Core extends Server {
  /** 创建一个DI-Server */
  static Create(): Core;
  /**
   * 创建一个DI-Server
   * @description
   * @author Big Mogician
   * @static
   * @param {{ [prop: string]: any }} [args] framework args
   * @returns {Core}
   * @memberof Core
   */
  static Create(args: { [prop: string]: any }): Core;
  /**
   * 创建一个DI-Server
   * @description
   * @author Big Mogician
   * @static
   * @param {Constructor<any>} [framework] use your own framework
   * @returns {Core}
   * @memberof Core
   */
  static Create(framework: Constructor<any>): Core;
  /**
   * 创建一个DI-Server
   * @description
   * @author Big Mogician
   * @static
   * @param {Constructor<any>} [framework] use your own framework
   * @param {{ [prop: string]: any }} [args] framework args
   * @returns {Core}
   * @memberof Core
   */
  static Create(
    framework: Constructor<any>,
    args: { [prop: string]: any }
  ): Core;
  static Create(...args: any[]) {
    const [arg01, arg02] = args;
    if (!arg02) {
      if (!arg01) {
        return new Core({});
      } else {
        return !arg01.prototype ? new Core(arg01) : new Core(arg02, arg01);
      }
    } else {
      return new Core(arg02, arg01);
    }
  }

  constructor(args: any, framework?: any) {
    super(bindDI(framework) || CoreFramework, args);
  }

  protected initInjections() {
    super.initInjections();
    this.scoped(CoreConfigReader);
  }

  protected initOptions() {
    super.initOptions();
    this.option(JSON_RESULT_OPTIONS, {
      format: true,
      keyResolver: JsonResolvers.camelcase,
      jsonTemplate: {
        code: 0,
        message: "success",
        data: null
      },
      jsonTplKey: "data"
    });
    this.option(RENDER_RESULT_OPTIONS, {
      onDevError: {
        tplStr: readFileString("app/views/errors/500.dev.njk", __dirname)
      },
      onError: { tplStr: readFileString("app/views/errors/500.njk", __dirname) }
    });
  }
}

export { CoreConfigReader, CoreContext, CallService };
export default Core;
