import connectDB from "@/lib/connect";
import { ApiSuccess, ApiError } from "@/utils/ApiResponse";
import Users from "@/models/user.model";
import { userType, userValidation } from "@/lib/validation";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

type Params = {
  id: string;
};

export default class userController {
  static async getAllUsers(request: Request) {
    try {
      connectDB();
      const getUsers = await Users.find({});
      return new Response(
        JSON.stringify(new ApiSuccess(200, "success", getUsers)),
        { status: 200 }
      );
    } catch (error) {
      console.log(error);
      return new Response(
        JSON.stringify(new ApiError(500, "Something went wrong")),
        {
          status: 500,
        }
      );
    }
  }

  static async getuser(request: Request, { params }: { params: Params }) {
    try {
      connectDB();
      const getUser = await Users.findById(params.id);
      return new Response(
        JSON.stringify(new ApiSuccess(200, "success", getUser)),
        { status: 200 }
      );
    } catch (error) {
      console.log(error);
      return new Response(
        JSON.stringify(new ApiError(500, "Something went wrong")),
        {
          status: 500,
        }
      );
    }
  }

  static async edituser(request: Request, { params }: { params: Params }) {
    const validate = userValidation.parse(await request.json());
    const { username, image }: userType = validate;
    try {
      connectDB();
      const ImageUrl = await cloudinary.uploader.upload(image);
      const user = await Users.findById(params.id);
      user.image = ImageUrl.url;
      user.username = username;
      await user.save();
      return new Response(
        JSON.stringify(new ApiSuccess(201, "success", user)),
        {
          status: 201,
        }
      );
    } catch (error) {
      console.log(error);
      return new Response(
        JSON.stringify(new ApiError(500, "Something went wrong")),
        {
          status: 500,
        }
      );
    }
  }
}
