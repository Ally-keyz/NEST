import { IsEmail, IsEnum, IsNotEmpty, IsString, MaxLength } from "class-validator";
import { userRole } from "src/enums/useEnum";

export class UsersDto {
    @IsEmail()
    @IsNotEmpty()
    email : string
    
    @IsNotEmpty()
    @IsString()
    @MaxLength(8)
    password : string

    @IsString()
    @IsNotEmpty()
    name : string

    @IsString()
    @IsNotEmpty()
    @IsEnum(userRole)
    role : string

}