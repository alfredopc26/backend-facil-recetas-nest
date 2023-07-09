import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as mongoose_schema, Types } from 'mongoose';
import { Recipe } from './recipe.schema';

export type User_document = User & Document;

@Schema()
export class User {
  @Prop({ unique: true })
  sub: string;
  @Prop()
  image: string;
  @Prop()
  email: string;
  @Prop({ type: mongoose_schema.Types.ObjectId, ref: 'Recipe' })
  recipes: Recipe[];
  @Prop({ type: mongoose_schema.Types.ObjectId, ref: 'Recipe' })
  favorites: Recipe[];
}

export const User_schema = SchemaFactory.createForClass(User);