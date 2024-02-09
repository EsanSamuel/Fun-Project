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

export interface IComment extends Document {
  author: mongoose.Types.ObjectId;
  product: mongoose.Types.ObjectId;
  comment: string;
  createdAt: any;
}

export interface workerProps {
  _id: string;
  name: string;
  email: string;
  worktype: "fulltime" | "parttime";
  author: {
    _id: string;
    username: string;
    email: string;
    image: string;
  };
}
[];

export interface productProps {
  author: {
    _id: string;
    username: string;
    image: string;
    email: string;
  };
  _id: string;
  title: string;
  details: string;
  price: string;
  image: string;
}
[];
