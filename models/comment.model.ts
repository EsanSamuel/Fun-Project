import { IComment } from "@/types";
import { Schema, models, model } from "mongoose";

const commentSchema = new Schema<IComment>({
  author: {
    type: Schema.Types.ObjectId,
    ref: "Users",
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: "Product",
  },
  comment: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: () => new Date(),
  },
});

const Comment = models.Comment || model<IComment>("Worker", commentSchema);
export default Comment;
