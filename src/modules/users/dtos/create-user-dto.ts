import { ApiProduces, ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsEmail, IsPositive, IsString, MinLength } from "class-validator";

export class createUserDto {
    @ApiProperty({
        type:'string',
        required:true,
        example:"Tom"
    })
    @IsString()
    name:string;

    @ApiProperty({
        type:'string',
        required:true,
        example:"password"
    })
    @MinLength(4)
    password:string;

    @ApiProperty({
        type:'string',
        required:true,
        example:"example@gmail.com"
    })
    @IsEmail()
    email:string;

    @ApiProperty({
        type:'number',
        required:false,
        example:18
    })
    @Type(()=>Number)
    @IsPositive()
    age:number;
   
    @ApiProperty({
        type: 'string',
        format: 'binary',
        required: false,
    })
    image: any;
    // @ApiProperty({
    //     type: 'string',
    //     format: 'binary',
    //     required: true,
    //   })
    // image: Express.Multer.File;
}