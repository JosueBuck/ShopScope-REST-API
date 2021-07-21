import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ILoginData } from './models/loginData.model';
import { IRegisterData } from './models/registerData.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUser } from '../user/models/user.model';
import { TimeoutError } from 'rxjs';
import { UserService } from 'src/user/user.service';
const bcrypt = require('bcrypt');


@Injectable()
export class AuthService {

    constructor(
        private readonly jwtService: JwtService,
        private readonly userService: UserService
    ) { }


    async authenticateUser(loginData: ILoginData) {

        const user = await this.userService.findUserByName(loginData.username);

        if (!user) {
            console.log("No user with this username")
            return false;
        }
        console.log(user);
        const comparePasswordsResult = await this.comparePasswords(loginData.password, user.password);
        console.log(comparePasswordsResult)

        if (comparePasswordsResult) {
            return this.generateJWT({ user });
        } else {
            return false;
        }
    }

    async generateJWT(payload: Object): Promise<string> {
        return await this.jwtService.signAsync(payload);
    }

    async hashPassword(password: string): Promise<string> {
        return await bcrypt.hash(password, 12);
    }

    async comparePasswords(newPassword: string, passwordHash: string): Promise<any | boolean> {
        return await bcrypt.compare(newPassword, passwordHash);
    }

   /*  async findUser(username: string): Promise<IUser> {
        const user = await this.userModel.findOne({ username: username }).exec();
        return user;
    } */

    async registerUser(registerData: IRegisterData) {
        const existingUsers: IUser = await this.userService.findUserByName(registerData.username);
        if (existingUsers) {
            console.log("user with this name already exists!");
            return false;
        }

        const hashedPassword = await this.hashPassword(registerData.password);
        const userRegisterData: IRegisterData = {
            username: registerData.username,
            password: hashedPassword,
            email: registerData.email
        }
        const newUser = await this.userService.createNewUser(userRegisterData)

        return { message: "User is now registered.", user: { username: newUser.username, email: newUser.email }, status: 200 }  

    }
}
