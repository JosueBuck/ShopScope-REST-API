import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    deleteUser(userId: string): Promise<{
        message: string;
        userId: string;
        statusCode: number;
    }>;
}
