import { Bundles } from "@exoskeleton/core";
import { Constructor } from "@bonbons/di";
import { IAstroboyContext } from "astroboy/definitions";
import { CtxFactory } from "@utils";

export interface CoreContext extends IAstroboyContext {}

export const CoreContext: Constructor<
  CoreContext
> = class PowerStationContext {} as any;

Bundles.scoped(CoreContext, CtxFactory);
