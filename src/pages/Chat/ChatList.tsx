import { Input, Flex, List } from 'antd';
import type { GetProps } from 'antd';
import ChatBox from '../../components/chat/ChatBox';
import { GoPlusCircle } from "react-icons/go";
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

type SearchProps = GetProps<typeof Input.Search>;

const { Search } = Input;

interface ChatData {
  id: number;
  title: string;
  imIn: number;
  nowMembers: number;
}

const onSearch: SearchProps['onSearch'] = (value, _e, info) => {
  console.log(info?.source, value);
};

const ChatList = () => {
  //const [myChatData, setMyChatData] = useState<ChatData[]>([]);
  const [chatData, setChatData] = useState<ChatData[]>([]);

  useEffect(() => {
    const fetchChatData = async () => {
      try {
        const response = await fetch(`http://localhost:9999/chats?page=1&pageSize=1000`);
        const responseChats: ChatData[] = await response.json();
        const chats = responseChats.reverse();

        //const myChats = chats.filter((chat) => chat.imIn === 1);
        //setMyChatData(myChats);
        setChatData(chats);
      } catch(error) {
        console.error('Error: ', error);
      }
    }

    fetchChatData();
  }, []);

  return (
    <Flex vertical gap="large" style={{width: '100%'}}>
      <Search 
        size='large'
        placeholder="소환사의 닉네임을 입력해주세요" 
        onSearch={onSearch} 
        enterButton 
      />
{/* 
      <div style={{height: '25%'}}>
        <p>내 채팅 목록</p>
        <List
          pagination={{ position: "bottom", align: "center", pageSize: 2, style: { marginTop: '-15px' } }}
          size="default"
          dataSource={myChatData}
          renderItem={(item) => (
            <ChatBox
              title={item.title}
              headcount={`${item.nowMembers+1}/2`}
              roomId={item.id}
            />
          )}
        />
      </div> */}

      <div>
        <Flex justify="end">
          <Link to={'/chat/Add'}>
            <GoPlusCircle style={{ fontSize: '1.5rem', color: '#000000' }} />
          </Link>
        </Flex>

        <List
          pagination={{ position: "bottom", align: "center", pageSize: 10, style: { marginTop: '-15px' }, showSizeChanger: false }}
          size="default"
          dataSource={chatData}
          renderItem={(item) => (
            <ChatBox
              title={item.title}
              headcount={`${item.nowMembers}/2`}
              roomId={item.id}
            />
          )}
        />
      </div>
    </Flex>
  );
};

export default ChatList;