import { ApiResponse } from './api-response';
import { RpcCallOption } from './call-option';
import { RpcBase } from './rpc-base';

export class MockRpc extends RpcBase {
    public static stub: {
        [route: string]: {
            data: ApiResponse<any>;
            predicate: (v: RpcCallOption) => boolean;
        }[]
    };

    public constructor(
        private m_Rpc: RpcBase,
    ) {
        super();
    }

    public async callWithoutThrow(v: RpcCallOption) {
        const res = (MockRpc.stub[v.route] ?? []).find(r => {
            return r.predicate(v);
        });
        if (res)
            return res.data

        return this.m_Rpc.callWithoutThrow(v);
    }
}