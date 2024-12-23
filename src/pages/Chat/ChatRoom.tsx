import { Input, message } from 'antd';
import styled from 'styled-components';
import { BsBoxArrowRight } from "react-icons/bs";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import { getUser } from '../../utils/user';

const { Search } = Input;

const ChatRoom = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [inputMessage, setInputMessage] = useState('');

  const { roomId } = useParams();

  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  if (!token) {
    message.error('다시 로그인 해주세요.');
    return null;
  }

  const user = getUser(token);

  useEffect(() => {
    const fetchChatMessage = async () => {
      try {
        const response = await axios.get(`http://localhost:9999/chats/${roomId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMessages(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('error: ', error);
      }
    };

    fetchChatMessage();

    const socket = io('ws://localhost:9999', {
      transports: ['websocket'],
      auth: { token: token },
    });

    socket.emit('joinRoom', { roomId }, (response: Response) => {
      if (!response.ok) {
        console.error(response);
      } else {
        message.success('성공적으로 채팅방에 참여했습니다.');
      }
    });
  }, [roomId, token]);

  const sendMessage = () => {
    if (!inputMessage.trim()) {
      alert('메세지를 입력해주세요!');
      return;
    }

    const socket = io('ws://localhost:9999', {
      transports: ['websocket'],
      auth: { token: token },
    });

    const newMessage = {
      content: inputMessage,
      roomId: roomId,
    };

    socket.emit('sendMessage', newMessage, (response: Response) => {
      if (response.ok) {
        console.log('메시지가 성공적으로 전송되었습니다.', response);
        setMessages((prevMessages) => [...prevMessages, { ...newMessage, sender_id: user.id }]);
        setInputMessage('');
      } else {
        console.error(response);
      }
    });
  };

  return (
    <ChatRoomContainer>
      <ChatHeader>
        <Profile>
          <HiOutlineUserCircle style={{ fontSize: '1.8rem' }} />
          <p style={{ fontSize: '0.8rem' }}>{user.nickname || '유저 닉네임'}</p>
        </Profile>

        <p style={{ fontSize: '1.1rem' }}>채팅방 이름</p>
        <BsBoxArrowRight style={{ fontSize: '1.8rem' }} onClick={() => navigate('/')} />
      </ChatHeader>

      <ChatContainer>
        <DayChat>2024년 12월 19일</DayChat>
        {Array.isArray(messages) && messages.map((message, index) => (
          message.sender_id === user.id ? (
            <MyChat key={index}>{message.content}</MyChat>
          ) : (
            <YourChat key={index}>{message.content}</YourChat>
          )
        ))}
      </ChatContainer>

      <div>
        <Search
          allowClear
          enterButton="전송"
          size="large"
          onChange={(e) => setInputMessage(e.target.value)}
          onSearch={sendMessage}
          value={inputMessage}
        />
      </div>
    </ChatRoomContainer>
  );
};

const ChatRoomContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const ChatHeader = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid;
  height: 6%;
  align-items: center;
  padding-bottom: 0.3rem;
  margin-bottom: 0.3rem;
`;

const Profile = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ChatContainer = styled.div`
  height: 86%;
  margin-bottom: 1rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 0.5rem;
`;

const DayChat = styled.p`
  text-align: center;
`;

const MyChat = styled.div`
  align-self: flex-end;
  max-width: 70%;
  border: 1px solid;
  border-radius: 10px;
  padding: 0.3rem 0.5rem;
`;

const YourChat = styled.div`
  align-self: flex-start;
  max-width: 70%;
  border: 1px solid;
  border-radius: 10px;
  padding: 0.3rem 0.5rem;
  display: block;
`;

export default ChatRoom;
