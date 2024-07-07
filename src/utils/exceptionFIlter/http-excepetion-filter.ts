import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost): any {
        const ctx = host.switchToHttp();
        const request: Request = ctx.getRequest();
        const response: Response = ctx.getResponse();
        const status: number = exception.getStatus();

        response.status(status).send({
            status,
            timestamp: new Date().toISOString(),
            path: request.url,
        });
    }
}
