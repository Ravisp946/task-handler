/* eslint-disable prettier/prettier */
import { IsOptional, IsString } from "class-validator";

export class FetchUserTaskDto {

    @IsOptional()
    @IsString()
    userId: string;

}