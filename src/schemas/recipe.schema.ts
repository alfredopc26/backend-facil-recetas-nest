import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as mongoose_schema, Types } from 'mongoose';

import { Ingredient } from './ingredient.schema';
import { User } from './user.schema';

export type Recipe_document = Recipe & Document;

@Schema({ _id: false })
export class IStep {
  @Prop()
  summary?: string;

  @Prop()
  picture?: string;

  @Prop()
  step_number?: number;
}

@Schema()
export class Recipe {
  @Prop()
  title: string;
  @Prop()
  description: string;
  @Prop()
  number_dinners: Number;
  @Prop()
  location: string[];
  @Prop()
  servings: Number;
  @Prop()
  time: Number;
  @Prop()
  ingredients: Ingredient[];
  @Prop()
  steps: IStep[];
  @Prop({ type: mongoose_schema.Types.ObjectId, ref: 'User' })
  user: User;
  @Prop()
  like: Number;
  @Prop()
  dislike: Number;
}

export const Recipe_schema = SchemaFactory.createForClass(Recipe);