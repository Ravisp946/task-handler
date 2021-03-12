/* eslint-disable prettier/prettier */
import { IsDefined, IsString } from "class-validator";

export class UserDto {

    @IsDefined()
    @IsString()
    name: string;

    @IsDefined()
    @IsString()
    email: string;

    @IsDefined()
    @IsString()
    team: string;

    @IsDefined()
    @IsString()
    department: string;

}