import { IsNumber, IsOptional, Max, Min } from 'class-validator';

export class PaginationDto {
    @Min(1)
    @Max(100)
    @IsNumber()
    page: number;

    @Min(1)
    @Max(100)
    @IsNumber()
    size: number;

    skip?: number;

    @IsOptional()
    search: string;

    @IsOptional()
    sort: string;
}
