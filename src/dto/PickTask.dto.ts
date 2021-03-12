/* eslint-disable prettier/prettier */
import { IsDate, IsDefined, IsString } from "class-validator";

export class PickTaskDto{

    @IsDefined()
    @IsString()
    id: string;

    @IsDefined()
    @IsDate()
    startingTime: Date;
}