import { Typography, Divider, Card, List, Input, Button, Flex } from "antd";
import styled from "styled-components";

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;

const data = [
  {
    author: "작성자1",
    content: "댓글 내용 1",
    datetime: "2024-12-09",
  },
  {
    author: "작성자2",
    content: "댓글 내용 2",
    datetime: "2024-12-09",
  },
];

const PostSection = styled.div``;

const CommentSection = styled.div``;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 0.5rem;
`;

const ViewPost = () => {
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
        <Title level={3}>제목</Title>
        <Text>작성자 | 작성날짜 | 조회수</Text>
        <Divider />
        <Paragraph>게시물 내용</Paragraph>
      </PostSection>
      <CommentSection>
        <Title level={5}>댓글</Title>
        <List
          locale={{ emptyText: [] }}
          dataSource={data}
          renderItem={(item) => (
            <Card size="small" style={{ marginBottom: "0.3rem" }}>
              <span>{item.author}</span>{" "}
              <span style={{ color: "gray" }}>{item.datetime}</span>
              <p>{item.content}</p>
            </Card>
          )}
        />
        <TextArea autoSize={{ minRows: 2 }} style={{ marginTop: "0.3rem" }} />
        <ButtonContainer>
          <Button style={{ width: "5rem" }}>등록</Button>
        </ButtonContainer>
      </CommentSection>
    </Flex>
  );
};

export default ViewPost;
