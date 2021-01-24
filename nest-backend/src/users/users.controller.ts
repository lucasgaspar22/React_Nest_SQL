import { BadRequestException, Body, Controller, Get, NotFoundException, Param, Post } from '@nestjs/common';
import { UserDTO } from 'src/dto/user.dto';
import { UserIdDTO } from 'src/dto/userID.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService) {}

    @Get()
    async getAll(): Promise<UserIdDTO[]>{
        let user =  await this.usersService.getAll();
        if (user.length === 0) {
            throw new NotFoundException('There are no Users in Database');
        }else{
            user.forEach(u => {delete u.password});
        }
        return user;
    }
    
    @Get(':id') 
    async getById(@Param('id') id: number ): Promise<UserIdDTO> {
        let user =  await this.usersService.getById(id);
        if (user === undefined) {
            throw new NotFoundException(`User with id:${id} not found`);
        }else delete user.password 
        return user;
    }

    @Get('/email/:email') 
    async getByEmail(@Param('email') email: string): Promise<UserIdDTO> {
        let user =  await this.usersService.getByEmail(email);
        if (user === undefined) {
            throw new NotFoundException(`User with e-mail:${email} not found. This e-mail is avaliable for registering`);
        }else delete user.password 
        return user;
    }

    @Post()
    async createNewUser(@Body() user: UserDTO): Promise<UserDTO> {
        let newUser = await this.usersService.createNewUser(user);
        if (newUser === undefined) {
            throw new BadRequestException("Bad request. Verify your payload")
        }else delete newUser.password 
        return newUser;
    }
}
