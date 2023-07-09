import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { IAuthResponse } from '../interfaces/IAuth';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) {}
}
