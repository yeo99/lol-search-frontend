import { useMemo } from "react";
import { Input, Flex, Button } from "antd";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import styled from "styled-components";

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
  const modules = useMemo(
    () => ({
      toolbar: [
        [{ header: [1, 2, false] }], // 제목 크기 설정
        ["bold", "italic", "underline"], // 글자 스타일: 굵기, 기울임, 밑줄
        ["image"], // 링크 및 이미지 추가
        [{ align: [] }], // 정렬
      ],
    }),
    []
  );
  return (
    <Flex vertical gap="large" style={{ width: "96%" }}>
      <Input placeholder="제목을 입력하세요" size="large" />
      <StyledQuill>
        <ReactQuill theme="snow" modules={modules} />
      </StyledQuill>
      <Button type="primary">작성 완료</Button>
    </Flex>
  );
};

export default WriteForm;
