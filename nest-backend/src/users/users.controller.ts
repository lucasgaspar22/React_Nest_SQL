import { BadRequestException, Body, Controller, Get, NotFoundException, Param, Post } from '@nestjs/common';
import { UserDTO } from 'src/dto/user.dto';
import { UserIdDTO } from 'src/dto/userID.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService) {}

    @Get()
    async getAll(): Promise<UserIdDTO[]>{
        let user =  await this.usersService.getAll() as UserIdDTO[];
        if (user.length === 0) {
            throw new NotFoundException('There are no Users in Database');
        }
        return user;
    }
    
    @Get(':id') 
    async getById(@Param('id') id: number ): Promise<UserIdDTO> {
        let user =  await this.usersService.getById(id);
        if (user === undefined) {
            throw new NotFoundException(`User with id:${id} not found`);
        }
        return user;
    }

    @Get('/email/:email') 
    async getByEmail(@Param('email') email: string): Promise<UserIdDTO> {
        let user =  await this.usersService.getByEmail(email);
        if (user === undefined) {
            throw new NotFoundException(`User with e-mail:${email} not found. This e-mail is avaliable for registering`);
        }
        return user;
    }

    @Post()
    async createNewUser(@Body() user: UserDTO): Promise<UserDTO> {
      return await this.usersService.createNewUser(user) as UserDTO;
    }
}
