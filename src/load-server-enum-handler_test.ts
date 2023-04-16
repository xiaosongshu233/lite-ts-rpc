import { deepStrictEqual, strictEqual } from 'assert';
import { Enum, EnumItem, LoadEnumHandlerContext, LoadEnumHandlerBase } from 'lite-ts-enum';
import { Mock } from 'lite-ts-mock';

import { LoadRpcServerEnumHandler as Self } from './load-server-enum-handler';
import { RpcBase } from './base';

describe('src/load-server-enum-handler.ts', () => {
    describe('.handle(opt: LoadEnumHandleOption)', () => {
        it('AreaData', async () => {
            const self = new Self(null, null, {});

            Reflect.set(self, 'getAllEnumItem', (arg: any, arg1: any, arg2: any) => {
                strictEqual(arg, null);
                strictEqual(arg1, Self.defaultApp);
                deepStrictEqual(arg2, {
                    name: 'AreaData'
                });
                return {};
            });

            const mockEnum = new Mock<Enum<EnumItem>>({
                name: 'AreaData'
            });
            const ctx: LoadEnumHandlerContext = {
                enum: mockEnum.actual,
                res: null
            };
            await self.handle(ctx);

            deepStrictEqual(ctx.res, {});
        });

        it('next', async () => {
            const self = new Self(null, null, {});

            const mockHandler = new Mock<LoadEnumHandlerBase>();
            self.setNext(mockHandler.actual);

            const mockEnum = new Mock<Enum<EnumItem>>({
                name: 'tstt'
            });
            const ctx: LoadEnumHandlerContext = {
                enum: mockEnum.actual,
                res: null
            };
            mockHandler.expected.handle(ctx);

            await self.handle(ctx);
        });

        it('other', async () => {
            const self = new Self(null, null, {
                'other': ['test']
            });

            const mockRpc = new Mock<RpcBase>();
            Reflect.set(self, 'm_LoadBalanceRpc', {
                1: {
                    other: mockRpc.actual
                }
            });

            Reflect.set(self, 'getAllEnumItem', (arg: any, arg1: any, arg2: any) => {
                strictEqual(arg, mockRpc.actual);
                strictEqual(arg1, 'other');
                deepStrictEqual(arg2, {
                    areaNo: 1,
                    name: 'test'
                });
                return [];
            });

            const mockEnum = new Mock<Enum<EnumItem>>({
                name: 'test'
            });
            const ctx: LoadEnumHandlerContext = {
                areaNo: 1,
                enum: mockEnum.actual,
                res: null
            };
            await self.handle(ctx);
            deepStrictEqual(ctx.res, []);
        });
    });

    describe('.getAllEnumItem(rpc: RpcBase, app: string, reqBody: any)', () => {
        it('ok', async () => {
            const self = new Self(null, null, {});

            const mockRpc = new Mock<RpcBase>();
            mockRpc.expectReturn(
                r => r.call({
                    body: {},
                    isThrow: true,
                    route: '/_app/find-enum-items'
                }),
                {
                    data: [{
                        value: 1
                    }]
                }
            );

            const fn = Reflect.get(self, 'getAllEnumItem').bind(self) as (_: RpcBase, __: string, ___: any) => Promise<void>;
            const res = await fn(mockRpc.actual, '_app', {});
            deepStrictEqual(res, {
                1: {
                    value: 1
                }
            });
        });
    });
});