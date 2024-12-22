import {
  Typography,
  Divider,
  Card,
  List,
  Input,
  Button,
  Flex,
  notification,
  Modal,
} from "antd";
import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import {
  useDeletePostMutation,
  useGetPostQuery,
} from "../../services/boardAPI";
import parse from "html-react-parser";
import {
  useCreateCommentMutation,
  useDeleteCommentMutation,
  useGetCommentsQuery,
} from "../../services/commentAPI";
import { useState } from "react";

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;

const PostSection = styled.div``;

const CommentSection = styled.div``;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 0.5rem;
`;

const DeleteButton = styled.span`
  color: #e07659;
  font-size: 0.8rem;
  margin-left: 0.6rem;
  cursor: pointer;
`;

const ViewPost = () => {
  const navigate = useNavigate();
  const { postId } = useParams();

  let fixedId: string = "";
  if (typeof postId === "string") {
    fixedId = postId;
  }

  const { data: postData } = useGetPostQuery(fixedId);

  const {
    data: commentData,
    isLoading: isLoadingComment,
    refetch,
  } = useGetCommentsQuery(fixedId);

  const [createComment, { isLoading: isCreatingComment }] =
    useCreateCommentMutation();

  const [commentContent, setCommentContent] = useState("");

  const [deletePost, { isLoading: isDeletingPost }] = useDeletePostMutation();

  const handleDeletePost = async () => {
    Modal.confirm({
      title: "게시물 삭제",
      content: "게시물을 삭제하시겠습니까?",
      okText: "삭제",
      cancelText: "취소",
      onOk: async () => {
        try {
          await deletePost(fixedId).unwrap();
          notification.success({
            message: "알림",
            description: "게시물이 삭제되었습니다",
            duration: 0,
            onClose: () => navigate("/board/list"),
          });
        } catch (error) {
          console.error("게시물 삭제 실패:", error);
        }
      },
    });
  };

  const handleCreateComment = async () => {
    if (!commentContent.trim()) {
      return;
    }

    try {
      await createComment({
        postId: fixedId,
        body: {
          content: commentContent,
        },
      }).unwrap();

      setCommentContent("");
      refetch();
    } catch (error) {
      console.error("댓글 등록 실패:", error);
    }
  };

  const localDate = (date: string | undefined) => {
    if (date === undefined) {
      return null;
    }
    const newDate = new Date(date + "Z");
    const koreanDateString = newDate.toLocaleString("ko-KR", {
      timeZone: "Asia/Seoul",
    });
    return koreanDateString;
  };

  const [deleteComment] = useDeleteCommentMutation();

  const handleDeleteComment = async (postId: number, commentId: number) => {
    Modal.confirm({
      title: "댓글 삭제",
      content: "댓글을 삭제하시겠습니까?",
      okText: "삭제",
      cancelText: "취소",
      onOk: async () => {
        try {
          await deleteComment({ postId, commentId }).unwrap();
          refetch();
          notification.success({
            message: "알림",
            description: "댓글이 삭제되었습니다.",
            duration: 1.5,
          });
        } catch (error) {
          console.error("댓글 삭제 실패:", error);
          notification.error({
            message: "오류",
            description: "댓글 삭제에 실패했습니다.",
            duration: 1.5,
          });
        }
      },
    });
  };

  return (
    <Flex
      style={{
        width: "96%",
        height: "100%",
      }}
      vertical
      justify="space-between"
    >
      <PostSection>
        <Flex justify="space-between">
          <Title level={3}>{postData?.title}</Title>
          <div>
            <Button
              size="small"
              onClick={() => navigate(`/board/update/${fixedId}`)}
            >
              수정
            </Button>
            <Button
              size="small"
              onClick={handleDeletePost}
              loading={isDeletingPost}
              style={{ marginLeft: "0.4rem" }}
            >
              삭제
            </Button>
          </div>
        </Flex>
        <Text>
          {postData?.userName} | 조회수:{postData?.views} <br />
          {localDate(postData?.createdAt)}
        </Text>
        <Divider />
        <Paragraph>{parse(postData?.content ?? "")}</Paragraph>
      </PostSection>
      <CommentSection>
        <Title level={5}>댓글 {postData?.comments}</Title>
        <List
          locale={{ emptyText: [] }}
          dataSource={commentData}
          loading={isLoadingComment}
          renderItem={(item) => (
            <Card size="small" style={{ marginBottom: "0.3rem" }}>
              <span>{item.userName}</span>{" "}
              <span style={{ color: "gray" }}>{localDate(item.createdAt)}</span>
              <p>
                {item.content}
                <DeleteButton
                  onClick={() =>
                    handleDeleteComment(item.postId, item.commentId)
                  }
                >
                  삭제
                </DeleteButton>
              </p>
            </Card>
          )}
        />
        <TextArea
          autoSize={{ minRows: 2 }}
          style={{ marginTop: "0.3rem" }}
          value={commentContent}
          onChange={(e) => setCommentContent(e.target.value)}
          placeholder="댓글을 입력하세요"
        />
        <ButtonContainer>
          <Button
            style={{ width: "5rem" }}
            onClick={handleCreateComment}
            loading={isCreatingComment}
          >
            등록
          </Button>
        </ButtonContainer>
      </CommentSection>
    </Flex>
  );
};

export default ViewPost;
