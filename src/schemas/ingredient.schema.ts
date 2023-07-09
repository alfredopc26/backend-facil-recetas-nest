import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as mongoose_schema, Types } from 'mongoose';

export type Ingredient_document = Ingredient & Document;

@Schema()
export class Ingredient {
  @Prop()
  title: string;
  @Prop()
  description: string;
  @Prop()
  amount_of_use: Number;
  @Prop()
  picture: string;
}

export const Ingredient_schema = SchemaFactory.createForClass(Ingredient);