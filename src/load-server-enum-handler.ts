import { EnumItem, LoadEnumHandlerContext, LoadEnumHandlerBase } from 'lite-ts-enum';
import { CustomError, ErrorCode } from 'lite-ts-error';

import { RpcBase } from './rpc-base';

export class AreaData extends EnumItem {
    public loadBalance: { [app: string]: string };
}

export class LoadRpcServerEnumHandler extends LoadEnumHandlerBase {
    public static defaultApp = 'config';

    private m_EnumNameApp: { [enumName: string]: string };
    private m_LoadBalanceRpc: {
        [areaNo: number]: {
            [app: string]: RpcBase;
        }
    } = {};

    private m_AllArea: Promise<{ [no: number]: AreaData }>;
    protected get allArea() {
        this.m_AllArea ??= new Promise<{ [no: number]: AreaData }>(async (s, f) => {
            try {
                const res = await this.getAllEnumItem(this.m_Rpc, LoadRpcServerEnumHandler.defaultApp, {
                    name: AreaData.name
                });
                s(res);
            } catch (ex) {
                f(ex);
            }
        });
        return this.m_AllArea;
    }

    public constructor(
        private m_Rpc: RpcBase,
        private m_BuildRpcFunc: (url: string) => RpcBase,
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
        opt.areaNo ??= 0;

        if (opt.enum.name == AreaData.name) {
            opt.res = await this.allArea;
        } else {
            const app = this.m_EnumNameApp[opt.enum.name];
            if (!app)
                return this.next.handle(opt);

            if (!this.m_LoadBalanceRpc[opt.areaNo]) {
                const allArea = await this.allArea;
                if (!allArea[opt.areaNo])
                    throw new CustomError(ErrorCode.panic, `${this.constructor.name}: 缺少${AreaData.name}.value = ${opt.areaNo}`);

                this.m_LoadBalanceRpc[opt.areaNo] = Object.entries(allArea[opt.areaNo].loadBalance).reduce((memo, [k, v]) => {
                    memo[k] = this.m_BuildRpcFunc(v);
                    return memo;
                }, {});
            }

            const rpc = this.m_LoadBalanceRpc[opt.areaNo][app];
            if (!rpc)
                throw new CustomError(ErrorCode.panic, `${this.constructor.name}: 缺少${AreaData.name}.loadBalance[${app}]`);

            opt.res = await this.getAllEnumItem(rpc, app, {
                areaNo: opt.areaNo,
                name: opt.enum.name,
            });
        }
    }

    private async getAllEnumItem(rpc: RpcBase, app: string, reqBody: any) {
        const res = await rpc.call<EnumItem[]>({
            body: reqBody,
            isThrow: true,
            route: `/${app}/find-enum-items`
        });
        return res.data.reduce((memo, r) => {
            memo[r.value] = r;
            return memo;
        }, {});
    }
}