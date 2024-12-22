import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Input, Flex, Button, notification } from "antd";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import styled from "styled-components";
import {
  useGetPostQuery,
  useUpdatePostMutation,
} from "../../services/boardAPI";

const StyledQuill = styled.div`
  .ql-toolbar {
    padding: 3px;
    border-radius: 8px 8px 0 0;
    button {
      width: 20px;
    }
  }

  .ql-container {
    border-radius: 0 0 8px 8px;
    height: 350px;
    width: 100%;
  }
`;

const WriteForm = () => {
  const { postId } = useParams();
  let fixedId: string = "";
  if (typeof postId === "string") {
    fixedId = postId;
  }

  const { data: postData } = useGetPostQuery(fixedId);

  const [title, setTitle] = useState(postData?.title);
  const [content, setContent] = useState(postData?.content);
  const [updatePost, { isLoading: isLoadingUpdate }] = useUpdatePostMutation();
  const navigate = useNavigate();

  const modules = useMemo(
    () => ({
      toolbar: [
        [{ header: [1, 2, false] }], // 제목 크기 설정
        ["bold", "italic", "underline"], // 글자 스타일: 굵기, 기울임, 밑줄
        //["image"], // 링크 및 이미지 추가
        [{ align: [] }], // 정렬
      ],
    }),
    []
  );

  const handleSubmit = async () => {
    try {
      if (typeof title === "string" && typeof content === "string") {
        await updatePost({
          postId: fixedId,
          body: { title, content },
        }).unwrap();
        notification.success({
          message: "알림",
          description: "게시물이 수정되었습니다",
          duration: 0,
          onClose: () => {
            navigate(`/board/view/${fixedId}`);
            location.reload();
          },
        });
      }
    } catch (error) {
      console.log(error);
      notification.error({
        message: "알림",
        description: "게시물 수정에 실패했습니다",
        duration: 0,
      });
    }
  };

  return (
    <Flex vertical gap="large" style={{ width: "96%" }}>
      <Input
        placeholder="제목을 입력하세요"
        size="large"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <StyledQuill>
        <ReactQuill
          theme="snow"
          modules={modules}
          value={content}
          onChange={setContent}
        />
      </StyledQuill>
      <Button
        type="primary"
        onClick={handleSubmit}
        loading={isLoadingUpdate}
        disabled={!title || !content}
      >
        작성 완료
      </Button>
    </Flex>
  );
};

export default WriteForm;
