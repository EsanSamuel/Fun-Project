import connectDB from "@/lib/connect";
import { ApiSuccess, ApiError } from "@/utils/ApiResponse";
import Worker from "@/models/workers";

export const GET = async (request: Request) => {
  try {
    connectDB();
    const getWorkers = await Worker.find({}).populate("author");
    return new Response(
      JSON.stringify(new ApiSuccess(200, "success", getWorkers)),
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return new Response(
      JSON.stringify(
        new ApiError(500, "Something went wrong", ["products not gotten"])
      ),
      {
        status: 500,
      }
    );
  }
};
