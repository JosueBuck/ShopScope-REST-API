import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";

@Injectable()
export class UserGuard implements CanActivate {
    
    constructor() { }

    canActivate(context: ExecutionContext): boolean {

        const request = context.switchToHttp().getRequest();

        const params = request.params;
        
        const userId = params.userId;

        if(userId == request.user._id) {
            return true;
        }

        return false;
    }
}