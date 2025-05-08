import { Get, Injectable, NotFoundException, OnModuleInit } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "./models";
import { createUserDto } from "./dtos/create-user-dto";
import { FsHelper } from "src/helpers";
import { UpdateUserDto } from "./dtos/update.user.dtos";
import { ImageDto } from "./dtos/image.dto";

@Injectable()
export class UserService{
    constructor(@InjectModel(User) private userModel:typeof User,
            private fs:FsHelper){
    }

    async getAll(){
        const users= await this.userModel.findAll()
        return {
            message:"success",
            count:users.length,
            data:users
        }
    }

    async getOne(id:number){
        const user = await this.userModel.findByPk(id);
        return {
            message:"success",
            data:user
        }
    }

    async createNew(payload:createUserDto,image:Express.Multer.File){
        let imgUrl:string=''
        if(image){
            imgUrl = await this.fs.uploadFile(image)
        }
        const user = await this.userModel.create({
            name:payload.name,
            email:payload.email,
            password:payload.password,
            age:payload.age,
            image:imgUrl
        })

        return {
            message:'yaratildi',
            data:user
        }
    }

    async UpdateUser(payload:UpdateUserDto,id:number){
        const user = await this.userModel.findByPk(id);
        if (!user) {
            throw new NotFoundException('User not found');
        }
        await this.userModel.update(
            {name:payload.name || user.name,
            email:payload.email || user.email,
            password:payload.password || user.password,
            age:payload.age || user.age},
            {where:{id:id}}
        )
        const updated = await this.userModel.findByPk(id)
        return {
            message:"success",
            data:updated
        }
    }

    async updateImg(image:Express.Multer.File,id:number){
        const user = await this.userModel.findByPk(id);
        if (!user) {
            throw new NotFoundException('User not found');
        }
        
        if(user.dataValues.image){
            await this.fs.deleteFile(user.dataValues.image);
        }

        let imgUrl = await this.fs.uploadFile(image);
        await this.userModel.update(
            {image:imgUrl},
            {where:{id:id}}
        )
        const updated = await this.userModel.findByPk(id)
        return {
            message:"success",
            data:updated
        }
    }

    async delete(id:number){
        const user = await this.userModel.findByPk(id);
        if (!user) {
            throw new NotFoundException('User not found');
        }
        if(user.dataValues.image){
            await this.fs.deleteFile(user.dataValues.image);
        }
        await this.userModel.destroy({
            where:{id:id}
        });
        return {
            message:"Successfully deleted!",
        }
    }
}