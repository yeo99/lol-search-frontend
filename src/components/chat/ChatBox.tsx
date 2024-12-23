import { message } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

interface ChatBoxProps {
  title: string;
  headcount: string;
  roomId: number;
}

const ChatBox: React.FC<ChatBoxProps> = ({title, headcount, roomId}) => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  if(!token) {
    message.error('다시 로그인 해주세요.');
    return;
  }

  const handleClick = async () => {
    try {
      const response = await fetch('http://localhost:9999/chats/join', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ roomId }),
      });

      if(response.ok) {
        navigate(`/chat/${roomId}`)
      } else {
        console.error('채팅방 입장에 실패했습니다');
      }
    } catch(error) {
      console.error('Error: ', error);
    }
  }

  return (
    <ChatBoxStyle onClick={handleClick}>
      <p style={{width: '90%'}}>{title}</p>
      <p>{headcount}</p>
    </ChatBoxStyle>
  )
}

const ChatBoxStyle = styled.div`
  color: #000000;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.6rem 0.7rem;
  border: 1px solid #17586e;
  border-radius: 0.7rem;
  font-size: 1rem;
  margin-top: 0.5rem;
`

export default ChatBox;