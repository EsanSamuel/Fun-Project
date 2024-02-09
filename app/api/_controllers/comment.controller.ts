import connectDB from "@/lib/connect";
import {
  commentType,
  commentValidation,
  editCommentType,
  editCommentValidation,
} from "@/lib/validation";
import Comment from "@/models/comment.model";
import { ApiError, ApiSuccess } from "@/utils/ApiResponse";

type Params = {
  params: {
    id: string;
  };
};

export default class CommentController {
  static async createComment(request: Request, { params }: Params) {
    const validate = commentValidation.parse(await request.json());
    const { userId, comment }: commentType = validate;
    try {
      connectDB();
      const productId = params.id;

      const newComment = new Comment({
        author: userId,
        product: productId,
        comment,
      });

      await newComment.save();

      return new Response(
        JSON.stringify(new ApiSuccess(201, "Comment created!", newComment)),
        { status: 201 }
      );
    } catch (error) {
      console.log(error);
      return new Response(
        JSON.stringify(
          new ApiError(500, "Comment creation failed!", [
            "Something went wrong",
          ])
        ),
        { status: 500 }
      );
    }
  }

  static async getcomment(request: Request, { params }: Params) {
    try {
      connectDB();
      const getComment = await Comment.find({ product: params.id }).populate(
        "author"
      );

      return new Response(
        JSON.stringify(new ApiSuccess(200, "Comment gotten!", getComment)),
        { status: 200 }
      );
    } catch (error) {
      return new Response(
        JSON.stringify(
          new ApiError(500, "Something went wrong", ["Something went wrong"])
        ),
        { status: 500 }
      );
    }
  }

  static async editComment(request: Request, { params }: Params) {
    const validate = editCommentValidation.parse(await request.json());
    const { comment }: editCommentType = validate;
    try {
      connectDB();
      const comments = await Comment.findById(params.id);
      comments.comment = comment;

      await comments.save();
      return new Response(
        JSON.stringify(new ApiSuccess(201, "Comment patched!", comments)),
        { status: 200 }
      );
    } catch (error) {
      return new Response(
        JSON.stringify(
          new ApiError(500, "Something went wrong", ["Something went wrong"])
        ),
        { status: 500 }
      );
    }
  }

  static async deleteComment(request: Request, { params }: Params) {
    try {
      connectDB();
      const comment = await Comment.findByIdAndDelete(params.id);
      return new Response(
        JSON.stringify(new ApiSuccess(200, "Comment deleted!", comment)),
        { status: 200 }
      );
    } catch (error) {
      return new Response(
        JSON.stringify(
          new ApiError(500, "Something went wrong", ["Something went wrong"])
        ),
        { status: 500 }
      );
    }
  }
}
