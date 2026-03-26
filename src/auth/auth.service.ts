import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { LoginDto, RegisterDto } from './dto';
import  bcrypt from 'bcrypt'
import { plainToInstance } from 'class-transformer';
import { ResponseUserDto } from 'src/users/dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService
  ){}


  async register(registerDto:RegisterDto){
    try{
      const {name,email,password} = registerDto
      await this.usersService.existsEmail(email)
      
      const hashedPassword = await bcrypt.hash(password,10)

      const user = await this.usersService.create({name,email,password:hashedPassword})
      return user
    }catch(error){
      throw error
    }
  }

  async login(loginDto:LoginDto){
    try{
      const {email,password} = loginDto
      const {user} = await this.usersService.findEmail(email)

      const isMatch = await bcrypt.compare(password,user.password)
      if(!isMatch) throw new UnauthorizedException({status:'Error',mensaje:'La contraseña es incorrecta'})
      
      const token = this.jwtService.sign({id:user.id,name:user.name,email:user.email})

      return {
        status:'Success',
        mensaje:'Inicio de sesion exitoso',
        token:token,
        user: user.email
      }
    }catch(error){
      throw error
    }
  }
}
