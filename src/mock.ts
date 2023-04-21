import { RpcBase } from './base';
import { RpcCallOption } from './call-option';
import { RpcResponse } from './response';

export class MockRpc extends RpcBase {
    public static stub: {
        [route: string]: {
            response: RpcResponse<any>;
            predicate: (v: RpcCallOption) => boolean;
        }[]
    } = {};

    public constructor(
        private m_Rpc: RpcBase,
    ) {
        super();
    }

    protected async onCall<T>(v: RpcCallOption) {
        const res = (MockRpc.stub[v.route] ?? []).find(r => {
            return r.predicate(v);
        });
        if (res)
            return res.response;

        return await this.m_Rpc.call<T>(v);
    }
}