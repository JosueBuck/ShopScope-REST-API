import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ILoginData } from './models/loginData.model';
import { IRegisterData } from './models/registerData.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUser } from './models/user.model';
const bcrypt = require('bcrypt');


@Injectable()
export class AuthService {

    constructor(
        private readonly jwtService: JwtService,
        @InjectModel('User') private readonly userModel: Model<IUser>
    ) { }


    async authenticateUser(loginData: ILoginData) {

        const user = await this.findUser(loginData.username);

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

    async findUser(username: string): Promise<IUser> {
        const user = await this.userModel.findOne({ username: username }).exec();
        return user;
    }

    async registerUser(registerData: IRegisterData) {
        const existingUsers = await this.userModel.find({ username: new RegExp('^' + registerData.username + '$', "i") });

        if (existingUsers.length >= 1) {
            console.log("user with this name already exists!");
            return false;
        }

        const hashedPassword = await this.hashPassword(registerData.password);
        const newUser = new this.userModel({ username: registerData.username, password: hashedPassword, email: registerData.email });
        await newUser.save();
        return true;
    }

    async deleteUser(username: string) {
        await this.userModel.deleteOne({username: username});
        return username;
    }


}
