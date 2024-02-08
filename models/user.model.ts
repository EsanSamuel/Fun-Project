import { IUser } from "@/types";
import { Schema, models, model } from "mongoose";

const userSchema = new Schema<IUser>({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: () => new Date(),
  },
});

const Users = models.Users || model<IUser>("Users", userSchema);
export default Users;
