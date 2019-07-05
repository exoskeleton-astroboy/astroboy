export type PF_DUBBO = "dubbo";
export type TIME_OUT = 3000;

export interface DefaultHeaders {
  "X-Request-Protocol": "dubbo" | string;
  "Content-Type": "application/json;charset=utf-8" | string;
  "X-Service-Chain": "" | string;
  "X-Routed-To": "" | string;
}

export interface Headers extends DefaultHeaders {
  "X-Request-Protocol": string;
  "X-Service-Chain": string;
  "X-Routed-To": string;
  "target-ip": string;
  "target-port": string;
  "target-who": string;
}

export interface OtherHeaders {
  [key: string]: string | number;
}

export interface DubboConfig {
  allowBigNumberInJSON: boolean;
}

export interface DubboOptions {
  xRoutedTo?: string;
  xServiceChain?: string;
  xRequestProtocol?: string | PF_DUBBO;
  timeout?: string | number | TIME_OUT;
  xTargetIp?: string;
  xTargetPort?: string;
  xTargetWho?: string;
  headers?: Headers;
}

//#region  fork from zan-ajax

export interface IJsonpOptionsWithoutUrl {
  dataType: "jsonp" | "JSONP";
  data?: any;
  jsonp?: string;
  jsonpCallback?: string | (() => string);
  timeout?: number;
  cache?: boolean;
  prefix?: string;
}

export interface IAjaxOptionsWithoutUrl {
  data?: any;
  method?: string;
  dataType?:
    | "json"
    | "arraybuffer"
    | "blob"
    | "document"
    | "text"
    | "stream"
    | "JSON"
    | "TEXT"
    | "STREAM"
    | "BLOB"
    | "DOCUMENT"
    | "ARRAYBUFFER";
  contentType?: string;
  headers?: { [key: string]: string };
  withCredentials?: boolean;
  username?: string;
  password?: string;
  timeout?: number;
  noXRequestedWithHeader?: boolean;
  allowBigNumberInJSON?: boolean;
  onUploadProgress?: (progressEvent: any) => void;
  onDownloadProgress?: (progressEvent: any) => void;
  // cancelToken?: CancelToken;
}

export type RequestOptions = IAjaxOptions | IJsonpOptions;

export interface IRequestConfig {
  transformRequest?: (options: RequestOptions) => RequestOptions;
}

export interface IJsonpOptions extends IJsonpOptionsWithoutUrl {
  url: string;
}

export interface IAjaxOptions extends IAjaxOptionsWithoutUrl {
  url: string;
}

//#endregion

export interface AjaxConfig extends IRequestConfig {
  plainResult: boolean;
}
