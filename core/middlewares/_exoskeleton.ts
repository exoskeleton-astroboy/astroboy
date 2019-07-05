import { serverInit } from "@exoskeleton/core";

export default function entry({ ctx, next }) {
  return serverInit(ctx, next);
}
