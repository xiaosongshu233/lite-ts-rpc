import { EnumItem, LoadEnumHandlerContext, LoadEnumHandlerBase } from 'lite-ts-enum';

import { RpcBase } from './base';

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

    public async handle(opt: LoadEnumHandlerContext) {
        const [app, enumName] = opt.enum.name.includes('.') ? opt.enum.name.split('.') : [ this.m_EnumNameApp[opt.enum.name] ?? this.m_DefaultApp, opt.enum.name];
        const res = await this.m_Rpc.call<EnumItem[]>({
            body: {
                areaNo: opt.areaNo,
                name: enumName,
            },
            isThrow: true,
            route: `/${app}/find-enum-items`,
        });
        opt.res = res.data.reduce((memo, r) => {
            memo[r.value] = r;
            return memo;
        }, {});
    }
}