import { Request } from 'express';

export interface Req extends Request {
    data: string;
    idRequest: string;
    idCorrelation?: string | string[];
    timeRequested?: number;
    sourceHostName?: string;
    sourceNetName?: string;
}
