import { Table,Model,Column, DataType } from "sequelize-typescript";
import { Col } from "sequelize/types/utils";

@Table({tableName:"users",timestamps:true})
export class User extends Model{
    @Column({type:DataType.TEXT})
    name:string;

    @Column({type:DataType.TEXT,unique:true})
    email:string;

    @Column({type:DataType.TEXT})
    password:string;

    @Column({type:DataType.INTEGER})
    age:number;

    @Column({type:DataType.TEXT})
    image:string;
}