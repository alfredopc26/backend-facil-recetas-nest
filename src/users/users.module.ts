import { Module } from '@nestjs/common';
import { UsersController } from './user/users.controller';
import { UserService } from './user/user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, User_schema } from 'src/schemas/user.schema';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([{ name: User.name, schema: User_schema }]),
  ],
  controllers: [UsersController],
  exports: [UserService, MongooseModule.forFeature([{ name: User.name, schema: User_schema }])],
  providers: [UserService],
})
export class UsersModule {}
