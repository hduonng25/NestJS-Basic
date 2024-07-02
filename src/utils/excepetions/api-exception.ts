import { HttpException, HttpStatus } from '@nestjs/common';
import { Errors } from '@Utils/result';
import { isString } from 'class-validator';

/**
 * Khởi tạo ApiException kế thừa từ HttpException -> HttpException là một lớp có sẵn trong NestJS
 * Class này nhận vào message, statusCode và params là thuộc tính bổ sung
 * Gán message và params cho các instance tương ứng
 * getResponse -> trả về lỗi với this.message là tham số
 *              -> getResponse là 1 lớp có sẵn của HttpException, chỉ kế thừa, sửa và sử dụng lại
 */
export class ApiException extends HttpException {
    public message: string | any;
    public params: object;

    constructor(message: string | any, statusCode: HttpStatus, params: object = []) {
        super(isString(message) ? message : JSON.stringify(message), statusCode);
        this.message = message;
        this.params = params;
    }

    public getResponse(): string | object {
        return Errors.error({
            code: '',
            message: this.message,
        });
    }
}
