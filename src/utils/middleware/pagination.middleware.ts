import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { PaginationDto } from '../dto';

@Injectable()
export class PaginationMiddleware implements NestMiddleware {
    constructor() {
    }

    use(req: Request, _: Response, next: NextFunction) {
        const pagination: PaginationDto = req.query as unknown as PaginationDto;

        pagination.page = !Number(pagination) ? 1 : Number(pagination.page);
        pagination.size = !Number(pagination) ? 10 : Number(pagination.size);
        pagination.skip = Number((pagination.page - 1) * pagination.size);

        next();
    }
}
