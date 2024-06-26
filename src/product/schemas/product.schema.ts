import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';

@Schema({ versionKey: false, toJSON: { transform: transformFunction } })
export class Product extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  price: number;
}

// Define a transform function to rename _id to productId
function transformFunction(doc, ret) {
  ret.productId = ret._id;
  delete ret._id;
  delete ret.__v; // Optional: remove __v if you don't need it in the output
}
export type ProductDocument = HydratedDocument<Product>;
export const ProductSchema = SchemaFactory.createForClass(Product);
