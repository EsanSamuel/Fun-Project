import Product from "@/models/product.model";
import connectDB from "@/lib/connect";
import { productType, productValidation } from "@/lib/validation";
import { v2 as cloudinary } from "cloudinary";
import { ApiError, ApiSuccess } from "@/utils/ApiResponse";
import ProductController from "../../_controllers/product.controller";

export const POST = ProductController.createProduct;
