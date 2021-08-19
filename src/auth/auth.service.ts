import { ConflictException, Injectable, NotFoundException, RequestTimeoutException, UnauthorizedException } from '@nestjs/common';
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
        let user: IUser;

        try {
            user = await this.userService.findUserByName(loginData.username);
        } catch {
            throw new RequestTimeoutException();
        }
        

        if (!user) {
            throw new NotFoundException('no user was found');
        }
        const comparePasswordsResult = await this.comparePasswords(loginData.password, user.password);

        if (comparePasswordsResult) {
            return this.generateJWT({ user });
        } else {
            throw new UnauthorizedException('wrong password');
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

    async registerUser(registerData: IRegisterData) {
        const existingUsers: IUser = await this.userService.findUserByName(registerData.username);
        if (existingUsers) {
            throw new ConflictException('User with this name already exists');
        }

        const hashedPassword = await this.hashPassword(registerData.password);
        const userRegisterData: IRegisterData = {
            username: registerData.username,
            password: hashedPassword,
            email: registerData.email
        }
        const newUser = await this.userService.createNewUser(userRegisterData)

        return { message: 'Created', user: { username: newUser.username, email: newUser.email, id: newUser.id }, statusCode: 201 }  

    }
}
