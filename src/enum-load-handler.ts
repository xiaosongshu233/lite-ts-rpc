import { EnumItem, EnumLoadHandlerBase, EnumLoadHandlerContext } from 'lite-ts-enum';

import { RpcBase } from './base';

export class RpcEnumLoadHandler extends EnumLoadHandlerBase {
    public constructor(
        private m_Rpc: RpcBase,
        private m_BuildItemFunc = (r: EnumItem) => r,
    ) {
        super();
    }

    public async handle(ctx: EnumLoadHandlerContext) {
        const res = await this.m_Rpc.call<EnumItem[]>({
            body: {
                areaNo: ctx.areaNo,
                name: ctx.enum.name,
            },
            isThrow: true,
            route: `/${ctx.app}/find-enum-items`,
        });
        ctx.res = res.data.reduce((memo, r) => {
            memo[r.value] = this.m_BuildItemFunc(r);
            return memo;
        }, {});
    }
}