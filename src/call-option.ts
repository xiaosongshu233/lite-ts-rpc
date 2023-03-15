export type RpcCallOption = {
    route: string;
    body?: { [key: string]: any; };
    header?: { [key: string]: string; };
};