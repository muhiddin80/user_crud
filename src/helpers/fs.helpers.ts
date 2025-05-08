import { Injectable } from "@nestjs/common";
import * as path from "node:path";
import * as fs from "node:fs"
import * as fsPromise from "node:fs/promises"

@Injectable()
export class FsHelper{
    async uploadFile(file:Express.Multer.File){
        const fileHolder = path.join(process.cwd(),"uploads")

        if(!fs.existsSync(fileHolder)){
            fs.mkdirSync(fileHolder,{recursive:true})
        }
        console.log(file.originalname)

        let fileName = `${Date.now()}-file.${file.originalname.split('.')[1]}`

        await fsPromise.writeFile(path.join(fileHolder,fileName),file.buffer);

        return fileName
    };

    async deleteFile(name:string){
        const fileHolder = path.join(process.cwd(),'uploads',name);

        await fsPromise.unlink(fileHolder);
        return {
            message:"success"
        }
    }
}