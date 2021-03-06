import { IResponse } from 'src/models/response.model';
import { LoginDataDto, RegisterDataDto, UpdatedUserDto } from './models/user.model';
import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    login(loginData: LoginDataDto): Promise<IResponse>;
    register(registerData: RegisterDataDto): Promise<IResponse>;
    deleteUser(userId: string): Promise<IResponse>;
    updateUserInformations(userId: string, updatedUser: UpdatedUserDto): Promise<IResponse>;
}
