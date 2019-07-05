export interface DIFrameworkMiddlewareConfigs {
  _exoskeleton: {
    priority?: number;
    enable?: boolean;
    ignore?: (string | RegExp)[];
  };
}

export default () =>
  <DIFrameworkMiddlewareConfigs>{
    _exoskeleton: {
      priority: 0.1,
      enable: true,
      ignore: [new RegExp(".*\\.(css|js|png|jpg|svg)$", "g")]
    }
  };
