import { JwtModule, JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersModule } from '../../users/users.module';
import { UserService } from '../../users/user/user.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { jwtConstants } from './constants';

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        UsersModule,
        JwtModule.register({
          secret: jwtConstants.secret,
          signOptions: { expiresIn: '900s' },
        })
      ],
      providers: [AuthService],
      controllers: [AuthController],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
