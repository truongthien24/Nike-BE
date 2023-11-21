import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, Length, MinLength } from 'class-validator';


/**
 * @openapi
 * 
 */


export class LoginUserDto {
    @IsString()
    @Length(20, 50)
    @IsOptional()
    email;
  
    @IsString()
    @MinLength(6-30)
    @IsOptional()
    name;
  
    @IsString()
    @MinLength(6-30)
    @IsOptional()
    city;
}