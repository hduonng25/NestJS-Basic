import { Inject, Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Response } from 'express';
import * as uuid from 'uuid';
import { Req } from '../interface';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

@Injectable()
export class RequestLogMiddleware implements NestMiddleware {
    constructor(@Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: Logger) {}

    use(req: Req, _: Response, next: NextFunction) {
        const idCorrelation: string | string[] = req.headers['x-correlation-id'] || uuid.v1();
        const idRequest: string = uuid.v1();

        req.idRequest = idRequest;
        req.idCorrelation = idCorrelation;

        this.logger.log(
            JSON.stringify({
                idRequest,
                idCorrelation,
                timeRequest: new Date(),
                method: req.method,
                path: req.path,
                url: req.originalUrl,
                body: req.body,
                query: req.query,
            }),
            RequestLogMiddleware.name,
        );

        next();
    }
}
