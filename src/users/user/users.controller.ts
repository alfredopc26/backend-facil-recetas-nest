import { Controller, Get, Post, Patch, Header, Query, Body, Param, Res } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UsersController {
    constructor(

        private readonly userService: UserService
      ) {}

    @Post('post-user-registered')
    create_profile(@Body() body){
        return this.userService.create_profile(body);
    }

}
