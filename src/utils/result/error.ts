import { HttpStatus } from '@nestjs/common';
import { ErrorType } from './type';

export class Errors {
    public static error(data: { code: string; message: string }): ErrorType {
        return {
            status: HttpStatus.BAD_REQUEST,
            code: data.code ?? '',
            message: data.message,
        };
    }

    public static alreadyExist(data: { location: string; code: string }): ErrorType {
        return {
            status: HttpStatus.BAD_REQUEST,
            code: data.code ?? '',
            message: `${data.location} is already exist`,
        };
    }

    public static invalidData(data: {
        code: string;
        location: string;
        value?: string;
        message?: string;
    }): ErrorType {
        return {
            status: HttpStatus.BAD_REQUEST,
            code: data.code ?? '',
            message: 'Invalid data',
            details: [
                {
                    location: data.location,
                    value: data.value,
                    message: data.message,
                },
            ],
        };
    }
}
