import { HttpMethod } from './http-method';

export interface IRpcCallOption {
    method: HttpMethod;
    route: string;
    body?: { [key: string]: any; };
    header?: { [key: string]: string; };
}