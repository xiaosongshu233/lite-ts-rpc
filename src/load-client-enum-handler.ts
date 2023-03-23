import { EnumItem, LoadEnumHandleOption, LoadEnumHandlerBase } from 'lite-ts-enum';

import { RpcBase } from './rpc-base';

export class LoadRpcClientEnumHandler extends LoadEnumHandlerBase {
    private m_EnumNameApp: { [enumName: string]: string };

    public constructor(
        private m_Rpc: RpcBase,
        private m_DefaultApp: string,
        appEnumNames: { [app: string]: string[] },
    ) {
        super();

        this.m_EnumNameApp = Object.entries(appEnumNames).reduce((memo, [k, v]) => {
            for (const cr of v) {
                memo[cr] = k;
            }
            return memo;
        }, {});
    }

    public async handle(opt: LoadEnumHandleOption) {
        const res = await this.m_Rpc.call<EnumItem[]>({
            body: {
                areaNo: opt.areaNo,
                name: opt.enum.name,
            },
            route: `/${this.m_EnumNameApp[opt.enum.name] ?? this.m_DefaultApp}/find-enum-items`
        });
        opt.res = res.reduce((memo, r) => {
            memo[r.value] = r;
            return memo;
        }, {});
    }
}