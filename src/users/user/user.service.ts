import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, Types } from 'mongoose';
import { User, User_document } from 'src/schemas/user.schema';

@Injectable()
export class UserService {
    auth0ApiURL:string;
    auth0ApiClientId:string;
    auth0ApiClientSecret:string;
    auth0Audience:string;
    auth0CustomUrl:string;
    auth0Refirect:string;
    mailgunUrlApi:string;
    mailgunUser:string;
    mailgunKey:string;
    mailgunFromEmail:string;

    constructor(
        config: ConfigService,
        @InjectModel(User.name) private userModel: Model<User_document>,
      ) {
        this.auth0ApiURL = config.get<string>('AUTH0_API_URL');
        this.auth0ApiClientId = config.get<string>('AUTH0_API_CLIENT_ID');
        this.auth0ApiClientSecret = config.get<string>('AUTH0_API_CLIENT_SECRET');
        this.auth0Audience = config.get<string>('AUTH0_AUDIENCE');
        this.auth0Refirect = config.get<string>('AUTHO_REDIRECT_URL');
        this.mailgunUrlApi = config.get<string>('MAILGUN_URL_API');
        this.mailgunUser = config.get<string>('MAILGUN_USER');
        this.mailgunKey = config.get<string>('MAILGUN_KEY');
        this.mailgunFromEmail = config.get<string>('MAILGUN_FROM_EMAIL');
      }

    async create_profile(data){
        const user_check = await this.userModel.findOne({sub: data.user_id})
        if(!user_check){
          const user_profile = new this.userModel({
            sub: data.user_id,
            email: data.email
          });
    
          return user_profile.save();
        }

    
        return user_check;
      }
}
