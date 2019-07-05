import { ConfigReader } from "@exoskeleton/core";
import { IAstroboyConfigs } from "astroboy/definitions";

interface IExoCoreBaseConfigs {
  "@astroboy.ts": {
    showTrace: boolean;
    diType: "proxy" | "native";
  };
}

interface InnerConfigs extends IExoCoreBaseConfigs, Partial<IAstroboyConfigs> {}

export interface IExoCoreConfigs
  extends IExoCoreBaseConfigs,
    IAstroboyConfigs {}

export class CoreConfigReader extends ConfigReader<IExoCoreConfigs> {}

export default function DefaultConfigs(): InnerConfigs {
  return {
    "@astroboy.ts": {
      showTrace: false,
      diType: "native"
    }
  };
}
