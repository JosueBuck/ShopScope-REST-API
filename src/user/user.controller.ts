import { Controller, Delete, Param } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {

    constructor(
        private readonly userService: UserService,
    ) { }

        @Delete('deleteUser/:userId')
        async deleteUser(@Param('userId') userId: string) {

            const response = await this.userService.deleteUser(userId);
            return response;
            
        }

}
