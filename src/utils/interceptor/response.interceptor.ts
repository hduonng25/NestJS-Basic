import {
    CallHandler,
    ExecutionContext,
    HttpStatus,
    Inject,
    Injectable,
    Logger,
    NestInterceptor,
} from '@nestjs/common';
import { Response } from 'express';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { catchError, map, Observable } from 'rxjs';
import { Result } from '../result/type';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
    constructor(@Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: Logger) {}

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> | Promise<Observable<any>> {
        return next.handle().pipe(
            map((data: Result) => {
                const res: Response = context.switchToHttp().getResponse<Response>();
                this.logger.log(JSON.stringify(data), ResponseInterceptor.name);
                res.status(data?.status ? data.status : HttpStatus.OK).send(data);
            }),
            catchError(async (err) => {
                throw new Error(err);
            }),
        );
    }
}
