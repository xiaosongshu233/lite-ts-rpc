export type RpcCallOption = {
    route: string;
    isThrow?: boolean;
    areaNo?: number;
    body?: { [key: string]: any; };
    header?: { [key: string]: string; };
};