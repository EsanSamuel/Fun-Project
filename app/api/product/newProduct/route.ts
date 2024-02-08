import Product from "@/models/product.model";
import connectDB from "@/lib/connect";
import { productType, productValidation } from "@/lib/validation";
import { v2 as cloudinary } from "cloudinary";
import { ApiError, ApiSuccess } from "@/utils/ApiResponse";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const POST = async (request: Request) => {
  const validation = productValidation.parse(await request.json());
  const { userId, details, title, price, image }: productType = validation;
  try {
    connectDB();
    const ImageUrl = await cloudinary.uploader.upload(image);
    const newProduct = new Product({
      author: userId,
      details,
      title,
      price,
      image: ImageUrl.url,
    });

    await newProduct.save();

    return new Response(
      JSON.stringify(
        new ApiSuccess(201, "Product created successfully!", newProduct)
      ),
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return new Response(
      JSON.stringify(new ApiError(500, "Something went wrong!")),
      { status: 500 }
    );
  }
};
