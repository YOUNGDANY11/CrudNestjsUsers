import { IsEmail, IsString, MinLength } from "class-validator"

export class RegisterDto {
    @IsString({message:'Es requerido el nombre'})
    @MinLength(2,{message:'El nombre debe tener almenos 2 caracteres'})
    name:string

    @IsString({message:'Es requerido el correo'})
    @MinLength(10,{message:'El correo debe tener almenos 10 caracteres'})
    @IsEmail({},{message:'Tiene que ser un correo valido'})
    email:string

    @IsString({message:'Es requerida la contraseña'})
    @MinLength(6,{message:'La contraseña debe tener almenos 2 caracteres'})
    password:string
}
