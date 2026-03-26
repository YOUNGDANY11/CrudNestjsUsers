import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Users{
    @PrimaryGeneratedColumn()
    id:number

    @Column({nullable:false})
    name:string

    @Column({nullable:false,unique:true})
    email:string

    @Column({nullable:false, length:255})
    password:string
}