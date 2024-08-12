import { HttpStatus, ValidationError, ValidationPipeOptions } from '@nestjs/common';
import { ApiException } from 'src/utils/exceptions';

/**
 * Khởi tạo cấu hình ValidationPipe
 * transform -> Nhằm cho phép chuyển đổi tham số đầu vào của các lớp DTO được đánh dấu
 * whitelist -> Loại bỏ các thuộc tính không được định nghĩa trong DTO class
 * exceptionFactory => Hàm tuỳ chỉnh để để khởi tạo exception khi có lỗi validation
 *                  -> Khởi tạo ApiException với 3 tham số: message, statusCode, param(Được khởi tạo trong ApiException)
 *                  -> errors.reduce 1 -> Tạo một Object chứa các lỗi, với key là tên thuộc tính, value là message
 *                  -> errors.reduce 2 -> Tạo một Object chứa tất cả các giá trị hợp lệ và không hợp lệ
 */
export const validationOptions: ValidationPipeOptions = {
    transform: true,
    whitelist: true,
    errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
    transformOptions: {
        enableImplicitConversion: true,
    },
    disableErrorMessages: false,
    exceptionFactory: (errors: ValidationError[]) =>
        new ApiException(
            errors.reduce(
                (pre, curr) => ({
                    ...pre,
                    [curr.property]:
                        Object.values(curr.constraints ?? {}).length > 0
                            ? Object.values(curr.constraints ?? {})[0]
                            : Object.values(curr.constraints ?? {}),
                }),
                {},
            ),
            HttpStatus.UNPROCESSABLE_ENTITY,
            errors.reduce(
                (pre, curr) => ({
                    ...pre,
                    ...curr.target,
                }),
                {},
            ),
        ),
};
