import fs from "fs";
import path from "path";

import { AstroboyContext } from "@exoskeleton/core";

export type PartSkip<T, SKIP = {}> = {
  [key in Exclude<keyof T, keyof SKIP>]: T[key]
};
export type PartReset<T, RESET = {}> = PartSkip<T, RESET> &
  { [key in Extract<keyof T, keyof RESET>]: T[key] };

export function readFileString(p: string, dir?: string) {
  return fs.readFileSync(path.resolve(dir || __dirname, p)).toString();
}

export const CtxFactory: [
  [typeof AstroboyContext],
  (context: AstroboyContext<any, any>) => any
] = [[AstroboyContext], (context: AstroboyContext) => context.ctx];
