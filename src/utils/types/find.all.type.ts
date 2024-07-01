export type FindAllResponse<T> = {
    page: number;
    count: number;
    totalPage: number;
    data: T[];
};
