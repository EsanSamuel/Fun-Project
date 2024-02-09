import { z } from "zod";

export const userValidation = z.object({
  username: z.string().min(1, {
    message: "Value too short",
  }),
  image: z.string().min(1, {
    message: "Value too short",
  }),
});

export type userType = z.infer<typeof userValidation>;

export const productValidation = z.object({
  userId: z.string().min(1, {
    message: "userId too short",
  }),
  image: z.string().min(1, {
    message: "Image value too short",
  }),
  details: z.string().min(1, {
    message: "Value too short",
  }),
  price: z.string().min(1, {
    message: "Value too short",
  }),
  title: z.string().min(1, {
    message: "Value too short",
  }),
});

export type productType = z.infer<typeof productValidation>;

export const workerValidation = z.object({
  userId: z.string().min(1, {
    message: "Value too short",
  }),
  name: z.string().min(1, {
    message: "Value too short",
  }),
  worktype: z.enum(["parttime", "fulltime"]),
  email: z.string().min(1, {
    message: "Value too short",
  }),
});

export type workerType = z.infer<typeof workerValidation>;

export const commentValidation = z.object({
  userId: z.string().min(1, {
    message: "Value too short",
  }),
  comment: z.string().min(1, {
    message: "Value too short",
  }),
});

export type commentType = z.infer<typeof commentValidation>;

export const editCommentValidation = z.object({
  comment: z.string().min(1, {
    message: "Value too short",
  }),
});

export type editCommentType = z.infer<typeof editCommentValidation>;
