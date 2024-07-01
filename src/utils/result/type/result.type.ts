import { HttpStatus } from '@nestjs/common';

export type SuccessType = {
    status: HttpStatus;
    message: string;
    code: string;
    data: any;
};

export type ErrorType = {
    status: HttpStatus;
    code: string;
    message: string;
    details?: ErrorDetails[];
};

export type ErrorDetails = {
    location: string;
    value: string;
    message: string;
};

export type Result = SuccessType | ErrorType;
