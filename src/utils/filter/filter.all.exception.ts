import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
    constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

    catch(exception: unknown, host: ArgumentsHost): any {
        const { httpAdapter } = this.httpAdapterHost;
        const ctx: HttpArgumentsHost = host.switchToHttp();
        const httpStatus: HttpStatus =
            exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
        
        const response = {
            status: httpStatus,
            message: 'Exception',
            details: {
                name: (exception as any).name,
                message: (exception as any).message,
            }
        }
        
        httpAdapter.reply(ctx.getResponse(), response, httpStatus);
    }
}
