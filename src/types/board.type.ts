export interface IPost {
  title: string;
  content: string;
  views: number;
  comments: number;
  postId: number;
  userId: number;
  userName: string;
  createdAt: string;
}

export interface IPostList {
  count: number;
  rows: IPost[];
}

export interface IPostBody {
  title: string;
  content: string;
}

export interface IResponse {
  postId: number;
  message: string;
}
