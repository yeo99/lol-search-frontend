import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./boardAPI";
import { IComment, ICommentResponse, ICommentBody } from "../types/board.type";

export const commentAPI = createApi({
  reducerPath: "commentApi",
  baseQuery,
  endpoints: (builder) => ({
    getComments: builder.query<IComment[], string>({
      query: (postId) => `/posts/${postId}/comments`,
    }),
    createComment: builder.mutation<
      ICommentResponse,
      { postId: string; body: ICommentBody }
    >({
      query: ({ postId, body }) => ({
        url: `/posts/${postId}/comments`,
        method: "POST",
        body,
      }),
    }),
    updateComment: builder.mutation<
      ICommentResponse,
      { postId: string; commentId: number; body: ICommentBody }
    >({
      query: ({ postId, commentId, body }) => ({
        url: `/posts/${postId}/comments/${commentId}`,
        method: "PUT",
        body,
      }),
    }),
    deleteComment: builder.mutation<
      ICommentResponse,
      { postId: number; commentId: number }
    >({
      query: ({ postId, commentId }) => ({
        url: `/posts/${postId}/comments/${commentId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetCommentsQuery,
  useCreateCommentMutation,
  useUpdateCommentMutation,
  useDeleteCommentMutation,
} = commentAPI;
