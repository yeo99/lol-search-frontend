import { Input, Flex, List } from 'antd';
import type { GetProps } from 'antd';
import ChatBox from '../../components/chat/ChatBox';
import { GoPlusCircle } from "react-icons/go";
import { Link } from 'react-router-dom';
// import ChatAdd from './ChatAdd';

type SearchProps = GetProps<typeof Input.Search>;

const { Search } = Input;

const myChatData = [
  {
    title: "제목 길이 테스트",
    headcount: "1/2"
  },
  {
    title: "제목 길이 넘어가는지 테스트",
    headcount: "1/2"
  },
  {
    title: "제목 길이 넘어가는지 테스트",
    headcount: "1/2"
  },
];

const chatData = [
  {
    title: "제목 길이 테스트",
    headcount: "1/2"
  },
  {
    title: "제목 길이 넘어가는지 테스트",
    headcount: "1/2"
  },
  {
    title: "제목 잘 되는지 테스트",
    headcount: "1/2"
  },
  {
    title: "제목제목제목제목제목제목제목제목제목제목",
    headcount: "1/2"
  },
  {
    title: "제목 잘 되는지 테스트",
    headcount: "1/2"
  },
  {
    title: "제목제목제목제목제목제목제목제목제목제목",
    headcount: "1/2"
  },
  {
    title: "제목 잘 되는지 테스트",
    headcount: "1/2"
  },
  {
    title: "제목제목제목제목제목제목제목제목제목제목",
    headcount: "1/2"
  },
  {
    title: "제목 잘 되는지 테스트",
    headcount: "1/2"
  },
  {
    title: "제목제목제목제목제목제목제목제목제목제목",
    headcount: "1/2"
  },
];

const onSearch: SearchProps['onSearch'] = (value, _e, info) => {
  console.log(info?.source, value)
};

const ChatList = () => {
  return (
    <Flex vertical gap="large" style={{width: '100%'}}>
      <Search 
        size='large'
        placeholder="소환사의 닉네임을 입력해주세요" 
        onSearch={onSearch} 
        enterButton 
      />

      <div style={{height: '25%'}}>
        <p>내 채팅 목록</p>
        <List
          pagination={{ position: "bottom", align: "center", pageSize: 2, style: { marginTop: '-15px' } }}
          size="default"
          dataSource={myChatData}
          renderItem={(item) => (
            <ChatBox
              title={item.title}
              headcount={item.headcount}
            />
          )}
        />
      </div>

      <div>
        <Flex justify="end">
          <Link to={'/chat/Add'}>
            <GoPlusCircle style={{ fontSize: '1.5rem', color: '#000000' }} />
          </Link>
        </Flex>

        <List
          pagination={{ position: "bottom", align: "center", pageSize: 7, style: { marginTop: '-15px' } }}
          size="default"
          dataSource={chatData}
          renderItem={(item) => (
            <ChatBox
              title={item.title}
              headcount={item.headcount}
            />
          )}
        />
      </div>
    </Flex>
  );
};

export default ChatList;