import { IWorker } from "@/types";
import { Schema, models, model } from "mongoose";

const workerSchema = new Schema<IWorker>({
  author: {
    type: Schema.Types.ObjectId,
    ref: "Users",
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  worktype: {
    type: String,
    required: true,
    enum: ["fulltime", "parttime"],
  },
  createdAt: {
    type: Date,
    default: () => new Date(),
  },
});

const Worker = models.Worker || model<IWorker>("Worker", workerSchema);
export default Worker;
