import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './users.entity';
import { Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { CreateUserDto, ResponseUserDto, UpdateUserDto } from './dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Users) private userRepository: Repository<Users>
    ){}


    private async existsEmail(email:string){
        const existsEmail = await this.userRepository.findOneBy({email})
        if(existsEmail) throw new ConflictException({status:'Error',mensaje:'Ya esta registrado este correo con otro usuario'})
    }


    async findAll(){
        try{
            const users = await this.userRepository.find()

            if(users.length === 0) throw new NotFoundException({
                status:'Error',
                mensaje:'No hay usuarios registrados'
            })

            return {
                status:'Success',
                mensaje:'Consulta exitosa',
                users: plainToInstance(ResponseUserDto,users)
            }
        }catch(error){
            throw error

        }
    }

    async findOneById(id:number){
        try{
            const user = await this.userRepository.findOneBy({id})
            if(!user) throw new NotFoundException({
                status:'Error',
                mensaje:'No existe este usuario'
            })

            return {
                status:'Success',
                mensaje:'Consulta exitosa',
                user: plainToInstance(ResponseUserDto,user)
            }
        }catch(error){
            throw error
        }
    }

    async create(createUserDto:CreateUserDto){
        try{
            const {email} = createUserDto
            await this.existsEmail(email)
            const user = await this.userRepository.save(createUserDto)
            return {
                status:'Success',
                mensaje:'Usuario creado con exito',
                user: plainToInstance(ResponseUserDto,user)
            }
        }catch(error){
            throw error
        }
    }

    async update(id:number,updateUserDto:UpdateUserDto){
        try{
            const existsUser = await this.findOneById(id)
            if(updateUserDto.email && updateUserDto.email !== existsUser.user.email){
                await this.existsEmail(updateUserDto.email)
            }

            const user = await this.userRepository.merge(existsUser.user,updateUserDto)
            await this.userRepository.save(user)
            return {
                status:'Success',
                mensaje:'Usuario actualizado con exito',
                user: plainToInstance(ResponseUserDto,user)
            }
        }catch(error){
            throw error
        }
    }

    async delete(id:number){
        try{    
            const user = await this.findOneById(id)
            await this.userRepository.remove(user.user)
            return {
                status:'Success',
                mensaje:'Usuario eliminado con exito'
            }
        }catch(error){
            throw error
        }
    }
}
