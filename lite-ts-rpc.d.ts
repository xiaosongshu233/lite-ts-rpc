type ApiResponse<T> = {
    data: T;
    err: number;
};
type RpcCallOption = {
    route: string;
    areaNo?: number;
    body?: {
        [key: string]: any;
    };
    header?: {
        [key: string]: string;
    };
};
declare enum Header {
    authToken = "H-A-T",
    env = "H-E",
    timeout = "H-T"
}
declare enum HttpMethod {
    get = "GET",
    post = "POST"
}
declare abstract class RpcBase {
    static ctor: string;
    static buildErrorFunc: (errorCode: number, data: any) => Error;
    call<T>(v: RpcCallOption): Promise<T>;
    abstract callWithoutThrow<T>(v: RpcCallOption): Promise<ApiResponse<T>>;
}
declare class MockRpc extends RpcBase {
    private m_Rpc;
    static stub: {
        [route: string]: {
            data: ApiResponse<any>;
            predicate: (v: RpcCallOption) => boolean;
        }[];
    };
    constructor(m_Rpc: RpcBase);
    callWithoutThrow(v: RpcCallOption): Promise<ApiResponse<any>>;
}
{ ApiResponse, RpcBase, RpcCallOption, Header, HttpMethod, MockRpc };