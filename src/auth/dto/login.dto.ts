import { PartialType } from '@nestjs/mapped-types';
import { IsEmail, IsString, MinLength } from 'class-validator';


export class LoginDto {
    @IsString({message:'Es requerido el correo'})
    @IsEmail({},{message:'Tiene que ser un correo valido'})
    email:string

    @IsString({message:'Es requerida la contraseña'})
    @MinLength(6,{message:'La contraseña debe tener almenos 2 caracteres'})
    password:string
}
