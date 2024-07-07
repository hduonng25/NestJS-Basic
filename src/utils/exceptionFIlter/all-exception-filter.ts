import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { AbstractHttpAdapter, HttpAdapterHost } from '@nestjs/core';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
    constructor(private readonly httpAdapterHost: any) {}

    catch(exception: unknown, host: ArgumentsHost): any {
        const adapterHost: HttpAdapterHost<AbstractHttpAdapter> = this.httpAdapterHost as HttpAdapterHost;
        const { httpAdapter } = adapterHost;

        const ctx: HttpArgumentsHost = host.switchToHttp();
        const httpStatus: HttpStatus =
            exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

        const responseBody = {
            status: httpStatus,
            timestamp: new Date().toISOString(),
            path: httpAdapter.getRequestUrl(ctx.getRequest()),
        };

        httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
    }
}
