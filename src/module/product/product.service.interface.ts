import { Result } from '@Utils/result/type';

export interface ProductServiceInterface {
    createDetails(): Promise<Result>;
}
