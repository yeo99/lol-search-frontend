import { Input, List, Flex, Button } from "antd";
import type { GetProps } from "antd";
import styled from "styled-components";

type SearchProps = GetProps<typeof Input.Search>;
const { Search } = Input;

const data = [
  {
    title: "Ant Design Title 1",
  },
  {
    title: "Ant Design Title 2",
  },
  {
    title: "Ant Design Title 3",
  },
  {
    title: "Ant Design Title 4",
  },
  {
    title: "Ant Design Title 1",
  },
  {
    title: "Ant Design Title 2",
  },
  {
    title: "Ant Design Title 3",
  },
  {
    title: "Ant Design Title 4",
  },
];

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 0.5rem;
`;

const onSearch: SearchProps["onSearch"] = (value, _e, info) =>
  console.log(info?.source, value);

const PostList = () => {
  return (
    <Flex vertical gap="medium" style={{ width: "96%", height: "100%" }}>
      <Search
        size="large"
        enterButton
        placeholder="제목 및 작성자를 검색하세요"
        onSearch={onSearch}
      />
      <ButtonContainer>
        <Button style={{ width: "6rem" }}>게시글 작성</Button>
      </ButtonContainer>
      <List
        pagination={{
          position: "bottom",
          align: "center",
          pageSize: 6,
        }}
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              title={<a href="https://ant.design">{item.title}</a>}
              description="2시간 전  |  집에 가고 싶다"
            />
          </List.Item>
        )}
      />
    </Flex>
  );
};

export default PostList;
