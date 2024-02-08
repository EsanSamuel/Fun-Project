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
    message: "Value too short",
  }),
  image: z.string().min(1, {
    message: "Value too short",
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

//userId,name,worktype,email

export const workerValidation = z.object({
  userId: z.string().min(1, {
    message: "Value too short",
  }),
  name: z.string().min(1, {
    message: "Value too short",
  }),
  worktype: z.string().min(1, {
    message: "Value too short",
  }),
  email: z.string().min(1, {
    message: "Value too short",
  }),
});

export type workerType = z.infer<typeof workerValidation>;
