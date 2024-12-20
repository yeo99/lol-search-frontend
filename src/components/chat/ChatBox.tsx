import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

interface ChatBoxProps {
  title: string;
  headcount: string;
}

const ChatBox: React.FC<ChatBoxProps> = ({title, headcount}) => {
  

  return (
    <Link to="/chat/room">
      <ChatBoxStyle>
        <p style={{width: '90%'}}>{title}</p>
        <p>{headcount}</p>
      </ChatBoxStyle>
    </Link>
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