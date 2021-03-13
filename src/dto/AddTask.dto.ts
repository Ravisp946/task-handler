/* eslint-disable prettier/prettier */
import { IsDefined, IsNumber, IsOptional, IsString } from "class-validator";

export class AddTaskDto {

    @IsDefined()
    @IsString()
    assigneeId: string;

    @IsDefined()
    @IsString()
    assignorId: string;

    @IsDefined()
    @IsString()
    title: string;

    @IsOptional()
    @IsString()
    description: string;

    @IsOptional()
    @IsString()
    jiraId: string;

    @IsDefined()
    @IsNumber()
    timeEstimate: number;
}