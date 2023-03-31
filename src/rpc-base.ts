import { ApiResponse } from './api-response';
import { RpcCallOption } from './call-option';

export abstract class RpcBase {
    public static body: { [key: string]: any } = {};
    public static ctor = 'RpcBase';
    public static header: { [key: string]: string } = {};
    public static buildErrorFunc: (errorCode: number, data: any) => Error;

    public async call<T>(v: RpcCallOption) {
        const resp = await this.callWithoutThrow<T>(v);
        if (resp.err)
            throw RpcBase.buildErrorFunc(resp.err, resp.data);

        return resp.data;
    }

    public abstract callWithoutThrow<T>(v: RpcCallOption): Promise<ApiResponse<T>>;
}