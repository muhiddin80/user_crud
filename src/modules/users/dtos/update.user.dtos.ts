import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsEmail, IsOptional, IsPositive, IsString, MinLength } from "class-validator";

export class UpdateUserDto {
    @ApiProperty({ type: 'string', 
                required: false, 
                example: "Tom" })
    @IsOptional()
    @IsString()
    name?: string;

    @ApiProperty({ type: 'string', 
                required: false, 
                example: "password" })
    @IsOptional()
    @MinLength(4)
    password?: string;

    @ApiProperty({ type: 'string', 
                required: false, 
                example: "example@gmail.com" })
    @IsOptional()
    @IsEmail()
    email?: string;

    @ApiProperty({ type: 'number', 
                required: false, 
                example: 18 })
    @IsOptional()
    @Type(() => Number)
    @IsPositive()
    age?: number;
}
