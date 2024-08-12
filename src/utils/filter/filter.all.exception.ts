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
        
        const response =
            exception instanceof HttpException
                ? {
                      ...(exception.getResponse() as object),
                      path: httpAdapter.getRequestUrl(ctx.getRequest()),
                  }
                : {
                      status: httpStatus,
                      timestamp: new Date().toISOString(),
                      path: httpAdapter.getRequestUrl(ctx.getRequest()),
                      message: 'An error has occurred, please contact the administrator for more details.',
                  };

        httpAdapter.reply(ctx.getResponse(), response, httpStatus);
    }
}
