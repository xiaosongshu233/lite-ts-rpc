import { ApiResponse } from './api-response';
import { RpcCallOption } from './call-option';
import { Header } from './header';
import { HttpMethod } from './http-method';
import { MockRpc } from './mock';
import { RpcBase } from './rpc-base';

export { ApiResponse, RpcBase, RpcCallOption, Header, HttpMethod, MockRpc };
globalThis['lite-ts-rpc'] = { RpcBase, Header, HttpMethod, MockRpc };