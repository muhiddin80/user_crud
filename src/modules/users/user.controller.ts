import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put, UploadedFile, UseInterceptors } from "@nestjs/common";
import { UserService } from "./user.service";
import { createUserDto } from "./dtos/create-user-dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiBody, ApiConsumes } from "@nestjs/swagger";
import { UpdateUserDto } from "./dtos/update.user.dtos";
import { ImageDto } from "./dtos/image.dto";

@Controller("users")
export class UserController {
    constructor(private service:UserService){}

    @Get()
    async getAll(){
        return await this.service.getAll()
    }

    @Get(":id")
    async getOne(
        @Param('id',ParseIntPipe) id:number
    ){
        return await this.service.getOne(id)
    }

    @Post()
    @UseInterceptors(FileInterceptor('image'))
    @ApiConsumes('multipart/form-data')
    async createNew(@Body() payload:createUserDto,@UploadedFile() image:Express.Multer.File){
        return await  this.service.createNew(payload,image)
    }

    @Patch(':id')
    async updateUser(@Body() payload:UpdateUserDto,
            @Param('id',ParseIntPipe) id:number){
        return await this.service.UpdateUser(payload,id)
    }

    @Put(":id/image")
    @UseInterceptors(FileInterceptor('image'))
    @ApiConsumes("multipart/form-data")
    @ApiBody({
        schema: {
          type: 'object',
          properties: {
            image: {
              type: 'string',
              format: 'binary'
            }
          }
        }
      })
    async update(@UploadedFile() image:Express.Multer.File,
        @Param('id',ParseIntPipe) id:number){
        return await this.service.updateImg(image,id)
    }

    @Delete(':id')
    async delete(
        @Param('id',ParseIntPipe) id:number){
            return await this.service.delete(id)
        }
}