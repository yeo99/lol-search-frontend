import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input, List, Button } from "antd";
import styled from "styled-components";
import { useGetPostsQuery } from "../../services/boardAPI";

const { Search } = Input;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 0.5rem;
`;

const PostList = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [keyWord, setKeyWord] = useState("");

  const pageSize = 6;

  const { data, isLoading } = useGetPostsQuery({
    keyWord,
    page: currentPage,
    pageSize,
  });

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleCreatePost = () => {
    navigate("/board/write");
  };

  const handleSearch = (value: string) => {
    setKeyWord(value);
    setCurrentPage(1);
  };

  return (
    <div style={{ width: "96%", height: "100%" }}>
      <Search
        size="large"
        enterButton
        placeholder="제목 및 작성자를 검색하세요"
        onSearch={handleSearch}
      />
      <ButtonContainer>
        <Button style={{ width: "6rem" }} onClick={handleCreatePost}>
          게시글 작성
        </Button>
      </ButtonContainer>
      <List
        loading={isLoading}
        pagination={{
          position: "bottom",
          align: "center",
          total: data?.count,
          current: currentPage,
          pageSize,
          onChange: handlePageChange,
        }}
        dataSource={data?.rows}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              title={
                <a href={`https://ant.design`}>
                  {item.title}
                  <span style={{ color: "blue" }}> ({item.comments})</span>
                </a>
              }
              description={`${item.createdAt}  |  ${item.userName}`}
            />
          </List.Item>
        )}
      />
    </div>
  );
};

export default PostList;
