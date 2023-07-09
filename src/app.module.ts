import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/user/users.controller';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MongooseConfigService } from './mongoose-config/mongoose-config.service';
import { RecipesModule } from './recipes/recipes.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.local','.env',],
      isGlobal: true,
    }),
    UsersModule,
    AuthModule,
    MongooseModule.forRootAsync({
      useClass: MongooseConfigService,
    }),
    RecipesModule,
  ],
  controllers: [AppController, UsersController],
  providers: [AppService],
  exports: [
    ConfigModule,
  ]
})
export class AppModule {}
