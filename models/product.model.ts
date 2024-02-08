import { IProduct } from "@/types";
import { Schema, models, model } from "mongoose";

const productSchema = new Schema<IProduct>({
  author: {
    type: Schema.Types.ObjectId,
    ref: "Users",
  },
  image: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  details: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: () => new Date(),
  },
});

const Product = models.Product || model<IProduct>("Product", productSchema);
export default Product;
