import { ConfigService } from '@nestjs/config';
import { AllConfigType } from '@Config/types';

/**
 * Phương thức kiểm tra dữ liệu khi Login
 * */

export async function adminJsAuth(config: ConfigService<AllConfigType>) {
    const defaultAdmin = {
        email: config.getOrThrow('adminjs.user', { infer: true }),
        password: config.getOrThrow('adminjs.password', { infer: true }),
    };

    const authenticate = async (email: string, password: string) => {
        if (email === defaultAdmin.email && password === defaultAdmin.password) {
            return Promise.resolve(defaultAdmin);
        }
        return null;
    };

    return {
        authenticate,
        cookieName: config.getOrThrow('adminjs.cookieName', { infer: true }),
        cookiePassword: config.getOrThrow('adminjs.cookiePassword', {
            infer: true,
        }),
    };
}
