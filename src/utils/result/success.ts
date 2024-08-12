import { HttpStatus } from '@nestjs/common';
import { Result } from './type';

export class Success {
    public static ok<T>(data: T, status?: HttpStatus, message?: string): Result {
        return this.result(data, status, message);
    }

    public static create<T>(data: T, status?: HttpStatus, message?: string): Result {
        return this.result(data, status, message);
    }

    public static noContent<T>(data: T, status?: HttpStatus, message?: string): Result {
        return this.result(data, status, message);
    }

    private static result<T>(data: T, status?: HttpStatus, message?: string) {
        return {
            status: status ? Number(status) : HttpStatus.OK,
            message: message ?? '',
            code: '',
            data,
        };
    }
}
