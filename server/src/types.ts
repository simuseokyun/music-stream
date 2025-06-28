import { Request, Response } from 'express';

export enum METHOD {
    GET = 'get',
    POST = 'post',
    PUT = 'put',
    DELETE = 'delete',
}

export interface CustomRoute {
    method: METHOD;
    route: string;
    handler: (req: Request, res: Response) => void;
}
export interface errorMessage {
    [key: number]: string;
}
