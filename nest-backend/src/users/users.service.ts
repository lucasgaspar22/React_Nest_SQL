import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { UserDTO } from '../dto/user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {

    public constructor ( @InjectRepository(User) private readonly userRepository:Repository<User>){}

    async getAll():Promise<User[]>{
        try{
            return await this.userRepository.find({});
        }catch(err){
            return err;
        }
    }

    async getById(id: number): Promise<User> {
        try {
          return await this.userRepository.findOne(id);
        } catch (err) {
          return err;
        }
    }

    async getByEmail(id: string): Promise<User> {
        try {
          return await this.userRepository.findOne({email: id});
        } catch (err) {
          return err;
        }
    }

    async createNewUser(user: UserDTO): Promise<User> {
        let newUser = new User();

        Object.keys(user).forEach(key=>{
            newUser[key] = user[key];
        });

        try{
            return await this.userRepository.save(newUser); 
        }
        catch (err) {
            return err;
        }
    }


}
