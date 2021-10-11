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
        
        const comparePasswordsResult = await this.comparePasswords(loginData.password, user.password);

        const userPayloadData = {
            _id: user.id,
            firstname: user.firstname,
            lastname: user.lastname,
            username: user.username,
            email: user.email
        }

        if (comparePasswordsResult) {
            return this.generateJWT({ userPayloadData });
        } else {
            throw new UnauthorizedException('Wrong username or password.');
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

}
