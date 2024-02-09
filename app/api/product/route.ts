import connectDB from "@/lib/connect";
import { ApiSuccess, ApiError } from "@/utils/ApiResponse";
import Product from "@/models/product.model";
import ProductController from "../_controllers/product.controller";

export const dynamic = "force-dynamic";

export const GET = ProductController.getProduct;
