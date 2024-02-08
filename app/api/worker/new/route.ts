import Worker from "@/models/workers";
import connectDB from "@/lib/connect";
import { workerValidation } from "@/lib/validation";
import { ApiError, ApiSuccess } from "@/utils/ApiResponse";

export const POST = async (request: Request) => {
  //const validate = workerValidation.parse(await request.json());
  const { userId, name, worktype, email } = await request.json();
  try {
    connectDB();

    const newWorker = new Worker({
      author: userId,
      email,
      worktype,
      name,
    });

    await newWorker.save();
    return new Response(
      JSON.stringify(
        new ApiSuccess(201, "Worket details added sucessfully", newWorker)
      ),
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return new Response(
      JSON.stringify(
        new ApiError(500, "Something went wrong", ["Something went wrong"])
      ),
      { status: 500 }
    );
  }
};
