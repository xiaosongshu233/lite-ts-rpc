import { ApiResponse } from './api-response';
import { RpcCallOption } from './call-option';
import { Header } from './header';
import { HttpMethod } from './http-method';
import { LoadRpcClientEnumHandler } from './load-client-enum-handler';
import { AreaData, LoadRpcServerEnumHandler } from './load-server-enum-handler';
import { MockRpc } from './mock';
import { RpcBase } from './rpc-base';

export { ApiResponse, AreaData, Header, HttpMethod, LoadRpcClientEnumHandler, LoadRpcServerEnumHandler, MockRpc, RpcBase, RpcCallOption };
globalThis['lite-ts-rpc'] = { AreaData, Header, HttpMethod, LoadRpcClientEnumHandler, LoadRpcServerEnumHandler, MockRpc, RpcBase };