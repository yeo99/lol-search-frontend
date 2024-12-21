import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IPost, IPostBody, IPostList, IResponse } from "../types/board.type";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BACKEND_SERVER_URL,
  headers: {
    Authorization: import.meta.env.VITE_BACKEND_TOKEN,
  },
});

export const boardAPI = createApi({
  reducerPath: "boardApi",
  baseQuery,
  endpoints: (builder) => ({
    getPosts: builder.query<
      IPostList,
      { keyWord?: string; pageSize: number; page: number }
    >({
      query: ({ keyWord, pageSize, page }) => {
        const params = new URLSearchParams({
          page: page.toString(),
          pageSize: pageSize.toString(),
        });
        if (keyWord) {
          params.append("keyword", keyWord);
        }
        return `/posts?${params.toString()}`;
      },
    }),
    getPost: builder.query<IPost, { postId: number }>({
      query: (postId) => `/posts/${postId}`,
    }),
    enrollPost: builder.mutation<IResponse, IPostBody>({
      query: (body) => ({
        url: `/posts`,
        method: "POST",
        body,
      }),
    }),
    updatePost: builder.mutation<
      IResponse,
      { postId: number; body: IPostBody }
    >({
      query: ({ postId, body }) => ({
        url: `/posts/${postId}`,
        method: "PUT",
        body,
      }),
    }),
    deletePost: builder.mutation<IResponse, { postId: number }>({
      query: (postId) => ({
        url: `/posts/${postId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetPostQuery,
  useEnrollPostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
} = boardAPI;
