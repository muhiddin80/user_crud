import { Module } from "@nestjs/common";
import { Model } from "sequelize";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "./models";
import { FsHelper } from "src/helpers";

@Module({
    imports:[SequelizeModule.forFeature([User])],
    providers:[UserService,FsHelper],
    controllers:[UserController]
})

export class UserModule {}