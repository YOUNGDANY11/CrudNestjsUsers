import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from './dto';
import { JwtAuthGuard } from 'src/auth/guards/auth.guard';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService){}

    @UseGuards(JwtAuthGuard)
    @Get()
    findAll(){
        return this.usersService.findAll()
    }

    @Get(':id')
    findOneById(@Param('id', ParseIntPipe) id:number){
        return this.usersService.findOneById(id)
    }

    @Post()
    create(@Body() createUserDto: CreateUserDto){
        return this.usersService.create(createUserDto)
    }

    @Put(':id')
    update(@Param('id', ParseIntPipe) id:number,@Body() updateUserDto: UpdateUserDto){
        return this.usersService.update(id,updateUserDto)
    }

    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id:number){
        return this.usersService.delete(id)
    }
}
