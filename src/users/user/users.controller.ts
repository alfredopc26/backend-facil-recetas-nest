import { Controller, Get, Post, Patch, Header, Query, Body, Param, Res, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from 'src/decorators/current-user.decorator';

@Controller('users')
export class UsersController {
    constructor(

        private readonly userService: UserService
      ) {}

    @Post('post-user-registered')
    create_profile(@Body() body){
        return this.userService.create_profile(body);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get()
    get_user_auth0(@CurrentUser() user ): Object {
        return this.userService.get_user_auth0(user?.sub);
    }

}
