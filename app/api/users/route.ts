import connectDB from "@/lib/connect";
import { ApiSuccess, ApiError } from "@/utils/ApiResponse";
import Users from "@/models/user.model";

export const GET = async (request: Request) => {
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
};
