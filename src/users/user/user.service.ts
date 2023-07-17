import { Injectable, HttpException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, Types } from 'mongoose';
import { User, User_document } from 'src/schemas/user.schema';
import axios from "axios";

@Injectable()
export class UserService {
    auth0ApiURL:string;
    auth0ApiClientId:string;
    auth0ApiClientSecret:string;
    auth0Audience:string;
    auth0CustomUrl:string;

    constructor(
        config: ConfigService,
        @InjectModel(User.name) private userModel: Model<User_document>,
      ) {
        this.auth0ApiURL = config.get<string>('AUTH0_API_URL');
        this.auth0ApiClientId = config.get<string>('AUTH0_API_CLIENT_ID');
        this.auth0ApiClientSecret = config.get<string>('AUTH0_API_CLIENT_SECRET');
        this.auth0Audience = config.get<string>('AUTH0_AUDIENCE');
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

    async get_user_auth0(sub: string){
        let token = '';
        try{
          token = await this.generate_token_api();
        }
        catch(err){
          console.error('generate_token_api', err);
          throw err;
        }
    
        return Promise.all([
          await axios({
            method: 'GET',
            url: `${this.auth0ApiURL}/api/v2/users/${sub}`,
            headers: { "Authorization": `Bearer ${token}`}
          }).then( (res) => {
            return res.data
          }).catch( err => {
            console.error(err.message)
          }),
        ]).then(async (res) => {
          const { __v, sub, ...user_profile } = await this.create_profile({
            'user_id': res[0]?.user_id,
            'email': res[0]?.email,
          }).then( user => user.toObject());
    
          return {
            'email': res[0]?.email,
            'name': res[0]?.name,
            'picture': res[0]?.picture,
            'user_id': res[0]?.user_id,
            'given_name': res[0]?.given_name,
            'family_name': res[0]?.family_name,
            'user_metadata': res[0]?.user_metadata,
            'app_metadata': res[0]?.app_metadata,
            ...user_profile
          }
        })
      }

    async generate_token_api(){
        return axios({
            method: 'POST',
            url: `${this.auth0ApiURL}/oauth/token`,
            headers:{ 'Content-Type': 'application/json'},
            data:{
              client_id: this.auth0ApiClientId,
              client_secret: this.auth0ApiClientSecret,
              audience: this.auth0Audience,
              grant_type: 'client_credentials',
            }
        }).then( response => {
          return response.data.access_token
        }).catch(err => {
         console.error(err);
         throw new HttpException(err.response.data, err.response.status);
        })
      }
}
