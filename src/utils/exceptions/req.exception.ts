import { HttpException, HttpStatus } from '@nestjs/common';
import { Errors } from '@Utils/result';
import { isString } from 'class-validator';

export class BadReqException extends HttpException {
    public message: string | any;

    constructor(message: string | any) {
        super(isString(message) ? message : JSON.stringify(message), HttpStatus.BAD_REQUEST);
        this.message = message;
    }

    getResponse(): string | object {
        return Errors.error({
            code: '',
            message: this.message,
        });
    }
}
