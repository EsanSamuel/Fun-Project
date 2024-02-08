import mongoose, { Document } from "mongoose";

export interface IUser extends Document {
  username: string;
  image: string;
  email: string;
  createdAt: any;
}

export interface IProduct extends Document {
  author: mongoose.Types.ObjectId;
  image: string;
  price: string;
  details: string;
  title: string;
  likes: number;
  createdAt: any;
}

export interface IWorker extends Document {
  author: mongoose.Types.ObjectId;
  name: string;
  email: string;
  worktype: string;
  createdAt: any;
}
