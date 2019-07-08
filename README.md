# @exoskeleton/astroboy

> powered by @exoskeleton/core and astroboy.

`@exoskeleton/astroboy` 是基于 `@exoskeleton/core` 实现的一套 DI 风格的上层框架。

## 环境需求

- `typescript: ^3.2.0`
- `node.js: ^8.0`
- `astroboy: ^1.1.0-beta.6`

## 推荐配置

- `typescript: ^3.4.5`
- `node.js: ^8.0`
- `astroboy: ^1.1.0-beta.6`

## 改动记录

- [CHANGELOG](./CHANGELOG.md)

## 更多

- @exoskeleton/core - [https://github.com/exoskeleton-astroboy/core](https://github.com/exoskeleton-astroboy/core)

## 开发（当前应用包）

- 打包：make pkg
- 发布 rc 版本：make rc
- 发布稳定版本： make publish

## 安装

```bash
# 安装DI-core
yarn add @exoskeleton/astroboy
# 安装astroboy，或者其他基于astroboy的上层框架
yarn add astroboy@^1.1.0
```

## 使用

### 1.初始化应用结构

结构参考 astroboy 标准项目，这里提几个注意点：

- 应用入口必须 ts 化：app.ts
- 使用新的 cli 工具，支持一套配置文件来定制 cli 行为

> exoskeleton.config.js

```javascript
module.exports = {
  tsconfig: "tsconfig.json",
  // 编辑器调试支持
  inspect: false,
  // dev启动自动热编译，需要配合下面的编译选项使用
  compile: true,
  // 并行类型检查，默认开启
  typeCheck: false,
  // 环境变量
  env: { NODE_ENV: "qa" },
  watch: [
    path.join(__dirname, "app/**/*.*"),
    path.join(__dirname, "definitions/**/*.*"),
    path.join(__dirname, "middlewares/**/*.*")
    // more watch files
  ],
  ignore: [
    path.join(__dirname, "app/middlewares/*.*")
    // more ignore files
  ],
  // 自动编译routers，如不需要删除此设置
  routers: {
    enabled: true,
    // 暴力编译，强刷输出内容
    always: true,
    // 应用整体的url前缀
    approot: "/v1",
    // 输出文件类型，支持js
    filetype: "ts",
    // 显示编译细节
    details: true
  },
  // configs文件编译选项，如不需要删除此设置
  configCompiler: {
    enabled: true,
    // 暴力编译，强刷输出内容
    force: true,
    // 待编译文件夹相对路径
    configroot: "app/config",
    // 编译输出的相对路径
    outputroot: "config"
  },
  // middlewares文件编译选项，如不需要删除此设置
  middlewareCompiler: {
    enabled: true,
    // 暴力编译，强刷输出内容
    force: true,
    // 待编译文件夹相对路径
    root: "app/middlewares/pipes",
    // 编译输出的相对路径
    output: "app/middlewares"
  }
};
```

### 2.创建服务

栗子 🌰：

```typescript
import { Injectable } from "@exoskeleton/core";
import { CallService, CoreContext } from "@exoskeleton/astroboy";

@Injectable()
export class DemoService {
  constructor(private ctx: CoreContext, private service: CallService) {}

  private x = 123456;

  public getXff() {
    return this.ctx.firstXff;
  }

  public createSession() {
    return this.service.dubboCall(
      "com.youzan.uic.session.api.service.UicSessionService",
      "createSessionId",
      []
    );
  }
}
```

### 3.创建控制器

栗子 🌰：

```typescript
import {
  Controller,
  Render,
  JsonResult,
  RenderResult
} from "@exoskeleton/core";
import {
  CoreContext,
  SkynetLoggerContextPlugin,
  YouzanFrameworkGlobal,
  Index,
  GET,
  Params,
  Query
} from "@exoskeleton/astroboy";
import { DemoService } from "../services/DemoServuce";
import { DPConfigReader } from "../config/config.default";
import { ReactS01 } from "../services/RS";

@Controller("demo")
class DemoController {
  constructor(
    // configs支持注入能力，后面会讲
    private reader: DPConfigReader,
    // 注入整个ctx
    private ctx: CoreContext,
    // Render 统一渲染服务
    private render: Render,
    // Global _global能力
    private global: YouzanFrameworkGlobal,
    private dmsrv: DemoService,
    private ds: ReactS01
  ) {}

  @Index(["", "*"])
  public async pageIndex() {
    this.render.setView({
      fuckData: this.dmsrv.getXff()
    });
    this.global.setGlobal("woshinidie", 666666);
    return new RenderResult("demo/index.njk");
    // this.ctx.setState({
    //   fuckData: this.dmsrv.getXff()
    // });
    // this.ctx.setGlobal("woshinidie", 666666);
    // await this.ctx.render("demo/index.njk");
  }

  @GET("tryget/:name")
  public async getMethod(
    @Params("name") name: string,
    @Query("id", true) id: number
  ) {
    // const result = await this.dmsrv.createSession();
    console.log(this.ds.show());
    this.ds.change();
    return new JsonResult({
      name: typeof name,
      id: typeof id,
      fxx: this.ctx.firstXff,
      fxx03: this.dmsrv.getXff(),
      configs: {
        views: this.reader.global.view,
        apollo: this.reader.read("apollo")
      },
      super: {
        a: this.ctx.header,
        v: this.ctx.app,
        x: this.ctx.querystring,
        b: this.ctx.getQueryData(),
        f: this.ctx.firstXff,
        g: this.ctx.getRequestData()
      }
    });
  }
}

export = DemoController;
```

### 4.创建 configs（使用 DI 能力）

如果要使用原始的 configs，不看这里就是了

如果想使用 DI 能力提供 configs 访问，同时兼顾类型感知，可以这样写

```typescript
import { ConfigReader } from "@exoskeleton/core";
import { DIFrameworkConfigs } from "@exoskeleton/astroboy";

// 本业务的配置
interface IBaseConfigs {
  pstaionDemo: {
    a: number;
    b: boolean;
  };
}

// 组装类型，让基础配置结构可选
interface InnerConfigs extends IBaseConfigs, Partial<DIFrameworkConfigs> {}

// 公开完整的configs结构，有利于后续框架使用
export interface IDemoBaseConfigs extends IBaseConfigs, DIFrameworkConfigs {}

// 公开configs服务，提供DI能力和类型感知（需要在app.ts手动注入）
export class DPConfigReader extends ConfigReader<IDemoBaseConfigs> {}

// 实现configs
export default function DefaultConfigs(): InnerConfigs {
  return {
    pstaionDemo: {
      a: 24521454,
      b: false
    },
    // 在当前项目里面覆盖默认配置
    CDN_CSS: "test"
  };
}
```

通过编译后的代码：

```typescript
// [@exoskeleton/core] 自动生成的代码
const tslib_1 = require("tslib");
const astroboy_ts_1 = require("@exoskeleton/core");
const di_framework_1 = require("@exoskeleton/astroboy");
class DPConfigReader extends astroboy_ts_1.ConfigReader {}
module.exports = (function DefaultConfigs() {
  return {
    pstaionDemo: {
      a: 24521454,
      b: false
    }
  };
})();
```

### 5.创建中间件（使用 DI 能力）

如果要使用原始的 middlewares

如果想把 DI 能力注入 middlewares，同时兼顾类型感知，可以这样写

```typescript
import { CoreContext } from "@exoskeleton/astroboy";

export default async function DemoFn(context: CoreContext) {
  console.log(context.ip);
  await this.next();
}
```

通过编译后的代码：

```typescript
// [@exoskeleton/core] 自动生成的代码
import { injectScope, IMiddlewaresScope } from "@exoskeleton/core";
import di_framework_1 = require("@exoskeleton/astroboy");
async function DemoFn(context) {
  console.log(context.ip);
  await this.next();
}
export = (options: any = {}, app: any) =>
  injectScope(async ({ injector, next }: IMiddlewaresScope) => {
    const _p0 = injector.get(di_framework_1.CoreContext);
    await DemoFn.call({ next, options, app }, _p0);
  });
```

没有 DI 的 middlewares 但也要进行编译的，可以这样写：

```typescript
import { serverInit } from "@exoskeleton/core";

export default function DI_INIT({ ctx, next }) {
  return serverInit(ctx, next);
}
```

通过编译后的代码：

```typescript
// [@exoskeleton/core] 自动生成的代码
import astroboy_ts_1 = require("@exoskeleton/core");
function DI_INIT({ ctx, next }) {
  return astroboy_ts_1.serverInit(ctx, next);
}
export = (options: any = {}, app: any) => async (ctx: any, next: any) => {
  return await DI_INIT(<any>{ ctx, options, app, next });
};
```

### 6.bootstrap 启动

> app.ts

```typescript
import path from "path";
import { PowerServer } from "@exoskeleton/astroboy";
import {
  RENDER_RESULT_OPTIONS,
  SIMPLE_LOGGER_OPTIONS
} from "@exoskeleton/core";
import { DPConfigReader } from "./config/config.default";

const configs = {
  ROOT_PATH: path.resolve(__dirname, "..")
};

// PowerServer.Create(WscPcBase, configs)
PowerServer.Create(configs)
  .option(SIMPLE_LOGGER_OPTIONS, {
    level:
      process.env.NODE_ENV === "development" || process.env.NODE_ENV === "qa"
        ? 2
        : 3
  })
  .scoped(DPConfigReader)
  .run({
    onStart: () => {
      console.log("\nDI DEMO started!");
      console.log("\nhello world!");
      console.log("\n苟利国家生死以，岂因祸福避趋之？\n👓\n🐸\n👔\n👖\n👞");
    }
  });
```

hrllo world!
