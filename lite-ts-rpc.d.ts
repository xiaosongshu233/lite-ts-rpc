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
    authData = "H-A-D",
    authToken = "H-A-T",
    env = "H-E",
    timeout = "H-T"
}
declare enum HttpMethod {
    get = "GET",
    post = "POST"
}
declare class EnumItem {
    value: number;
    key?: string;
    text?: string;
}
type LoadEnumHandleOption = {
    enum: Enum<any>;
    res: {
        [no: number]: any;
    };
    areaNo?: number;
};
declare abstract class LoadEnumHandlerBase {
    protected next: LoadEnumHandlerBase;
    setNext(v: LoadEnumHandlerBase): LoadEnumHandlerBase;
    abstract handle(opt: LoadEnumHandleOption): Promise<void>;
}
declare class Enum<T extends EnumItem> {
    name: string;
    private m_AreaNo;
    private m_LoadHandler;
    private m_ReduceFunc;
    private m_Reduce;
    private m_AllItem;
    get allItem(): Promise<{
        [no: number]: T;
    }>;
    get items(): Promise<T[]>;
    constructor(name: string, m_AreaNo: number, m_LoadHandler: LoadEnumHandlerBase, m_ReduceFunc: {
        [key: string]: (memo: any, item: T) => any;
    });
    get(predicate: (entry: T) => boolean): Promise<T>;
    getReduce<TReduce>(typer: string): Promise<TReduce>;
}
declare abstract class EnumFactoryBase {
    static ctor: string;
    abstract build<T extends EnumItem>(nameOrCtor: string | (new () => T), areaNo?: number): Enum<T>;
}
declare class EnumFactory extends EnumFactoryBase {
    private m_LoadHandler;
    private m_ReduceFunc;
    constructor(m_LoadHandler: LoadEnumHandlerBase, m_ReduceFunc: {
        [key: string]: (memo: any, item: any) => any;
    });
    build<T extends EnumItem>(nameOrCtor: string | (new () => T), areaNo?: number): Enum<any>;
}
type Value = {
    count: number;
    valueType: number;
} & Partial<{
    targetNo: number;
    targetType: number;
    source: string;
}>;
type Reward = Value & {
    weight?: number;
};
type ValueCondition = Value & {
    op: string;
};
declare class ValueTypeData extends EnumItem {
    autoRecovery: {
        countdownOnValueType: number;
        interval: number;
        limitValueType: number;
    };
    isNegative: boolean;
    isReplace: boolean;
    parser?: {
        exp: string;
    };
    range: {
        max: number;
        min: number;
    };
    reward: {
        addition: {
            childValueType: number;
            mainValueType: number;
        };
        open: Reward[][];
    };
    sync: {
        valueTypes: number[];
    };
    text: string;
    time: {
        valueType: number;
        momentType: string;
    };
    value: number;
}
declare abstract class RpcBase {
    static ctor: string;
    static buildErrorFunc: (errorCode: number, data: any) => Error;
    call<T>(v: RpcCallOption): Promise<T>;
    abstract callWithoutThrow<T>(v: RpcCallOption): Promise<ApiResponse<T>>;
}
declare class LoadRpcClientEnumHandler extends LoadEnumHandlerBase {
    private m_Rpc;
    private m_DefaultApp;
    private m_EnumNameApp;
    constructor(m_Rpc: RpcBase, m_DefaultApp: string, appEnumNames: {
        [app: string]: string[];
    });
    handle(opt: LoadEnumHandleOption): Promise<void>;
}
declare class AreaData extends EnumItem {
    loadBalance: {
        [app: string]: string;
    };
}
declare class LoadRpcServerEnumHandler extends LoadEnumHandlerBase {
    private m_Rpc;
    private m_BuildRpcFunc;
    static defaultApp: string;
    private m_EnumNameApp;
    private m_LoadBalanceRpc;
    private m_AllArea;
    protected get allArea(): Promise<{
        [no: number]: AreaData;
    }>;
    constructor(m_Rpc: RpcBase, m_BuildRpcFunc: (url: string) => RpcBase, appEnumNames: {
        [app: string]: string[];
    });
    handle(opt: LoadEnumHandleOption): Promise<void>;
    private getAllEnumItem;
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
