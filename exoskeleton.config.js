module.exports = {
  configCompiler: {
    enabled: true,
    force: true,
    configroot: "core/configs",
    outputroot: "config"
  },
  middlewareCompiler: {
    enabled: true,
    force: true,
    root: "core/middlewares",
    output: "app/middlewares"
  },
  routers: {
    enabled: false
  }
};
