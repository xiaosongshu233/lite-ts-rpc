export type RpcCallOption = {
    route: string;
    areaNo?: number;
    body?: { [key: string]: any; };
    header?: { [key: string]: string; };
};