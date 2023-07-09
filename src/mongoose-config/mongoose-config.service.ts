import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModuleOptions } from '@nestjs/mongoose';

@Injectable()
export class MongooseConfigService {
  constructor(private configService: ConfigService) {}
  
  createMongooseOptions(): MongooseModuleOptions {
    return {
      uri: this.configService.get<string>('MONGODB_URL'),
    };
  }
}
