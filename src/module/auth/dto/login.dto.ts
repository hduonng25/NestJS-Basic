import { IsOptional } from 'class-validator';

export class LogInDto {
    @IsOptional()
    username: string;

    @IsOptional()
    password: string;
}
