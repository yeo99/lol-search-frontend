import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input, Flex, Button, notification } from "antd";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import styled from "styled-components";
import { useEnrollPostMutation } from "../../services/boardAPI";

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
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [enrollPost, { isLoading }] = useEnrollPostMutation();
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
      await enrollPost({ title, content }).unwrap();
      notification.success({
        message: "알림",
        description: "게시물이 등록되었습니다",
        duration: 0,
        onClose: () => navigate("/board/list"),
      });
    } catch (error) {
      notification.error({
        message: "알림",
        description: "게시물 등록에 실패했습니다",
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
        loading={isLoading}
        disabled={!title || !content}
      >
        작성 완료
      </Button>
    </Flex>
  );
};

export default WriteForm;
