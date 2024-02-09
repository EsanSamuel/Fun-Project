import CommentController from "../../_controllers/comment.controller";

export const POST = CommentController.createComment;
export const GET = CommentController.getcomment;
export const PATCH = CommentController.editComment;
export const DELETE = CommentController.deleteComment;
