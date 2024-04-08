import { PoolClient } from "pg";


export const IPoolClient = Symbol("IPoolClient").valueOf();
export interface IPoolClient extends PoolClient { }