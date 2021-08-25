import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ILoginData, IUser, IUserMongoose } from '../user/models/user.model';
const bcrypt = require('bcrypt');


@Injectable()
export class AuthService {

    constructor(
        private readonly jwtService: JwtService
    ) { }


    async authenticateUser(loginData: ILoginData, user: IUserMongoose) {
        

        if (!user) {
            throw new NotFoundException('no user was found');
        }
        const comparePasswordsResult = await this.comparePasswords(loginData.password, user.password);

        const userPayloadData = {
            _id: user.id,
            username: user.username,
            email: user.email
        }

        if (comparePasswordsResult) {
            return this.generateJWT({ userPayloadData });
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

    // async create(registerData: IRegisterData) {
    //     // const existingUsers: IUser = await this.userService.findUserByName(registerData.username);
    //     // if (existingUsers) {
    //     //     throw new ConflictException('User with this name already exists');
    //     // }

    //     const hashedPassword = await this.hashPassword(registerData.password);
    //     const userRegisterData: IRegisterData = {
    //         username: registerData.username,
    //         password: hashedPassword,
    //         email: registerData.email
    //     }
    //     const newUser = await this.userService.createNewUser(userRegisterData)

    //     return { message: 'Created', user: { username: newUser.username, email: newUser.email, id: newUser.id }, statusCode: 201 }  

    // }
}
