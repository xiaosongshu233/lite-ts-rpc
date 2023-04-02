import { deepStrictEqual } from 'assert';
import { Enum, EnumItem } from 'lite-ts-enum';
import { Mock } from 'lite-ts-mock';

import { LoadRpcClientEnumHandler as Self } from './load-client-enum-handler';
import { RpcBase } from './rpc-base';

describe('src/load-client-enum-handler.ts', () => {
    describe('.handle(opt: LoadEnumHandleOption)', () => {
        it('default', async () => {
            const mockRpc = new Mock<RpcBase>();
            const self = new Self(mockRpc.actual, 'd-app', {});

            mockRpc.expectReturn(
                r => r.call({
                    body: {
                        areaNo: 11,
                        name: 'test'
                    },
                    isThrow: true,
                    route: '/d-app/find-enum-items'
                }),
                {
                    data: [{
                        value: 1
                    }]
                }
            );

            const mockEnum = new Mock<Enum<EnumItem>>({
                name: 'test'
            });
            const ctx = {
                areaNo: 11,
                enum: mockEnum.actual,
                res: null
            };
            await self.handle(ctx);
            deepStrictEqual(ctx.res, {
                1: {
                    value: 1
                }
            });
        });

        it('other', async () => {
            const mockRpc = new Mock<RpcBase>();
            const self = new Self(mockRpc.actual, 'd-app', {
                'o-app': ['test']
            });

            mockRpc.expectReturn(
                r => r.call({
                    body: {
                        areaNo: 11,
                        name: 'test'
                    },
                    isThrow: true,
                    route: '/o-app/find-enum-items'
                }),
                {
                    data: [{
                        value: 1
                    }]
                }
            );

            const mockEnum = new Mock<Enum<EnumItem>>({
                name: 'test'
            });
            const ctx = {
                areaNo: 11,
                enum: mockEnum.actual,
                res: null
            };
            await self.handle(ctx);
            deepStrictEqual(ctx.res, {
                1: {
                    value: 1
                }
            });
        });
    });
});