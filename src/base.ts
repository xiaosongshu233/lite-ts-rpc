import { CustomError } from 'lite-ts-error';

import { RpcCallOption } from './call-option';
import { RpcResponse } from './response';

export abstract class RpcBase {
    public static ctor = 'RpcBase';
    public static header: { [key: string]: string } = {};
    public static body: { [key: string]: any } = {};

    public async call<T>(v: RpcCallOption) {
        const resp = await this.onCall<T>(v);
        if (resp.err && v.isThrow)
            throw new CustomError(resp.err, resp.data);

        return resp;
    }

    protected abstract onCall<T>(v: RpcCallOption): Promise<RpcResponse<T>>;
}