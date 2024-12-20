import { Input } from 'antd';
import type { GetProps } from 'antd';
import styled from 'styled-components';
import { BsBoxArrowRight } from "react-icons/bs";
import { HiOutlineUserCircle } from "react-icons/hi2";


type SearchProps = GetProps<typeof Input.Search>;

const { Search } = Input;


const onSend: SearchProps['onSearch'] = (value, _e, info) => console.log(info?.source, value);




const ChatRoom = () => {
  return (
    <ChatRoomContainer>
      <ChatHeader>
        <Profile>
          <HiOutlineUserCircle style={{fontSize: '1.8rem'}} />
          <p style={{fontSize: '0.8rem'}}>유저 닉네임</p>
        </Profile>
        
        <p style={{fontSize: '1.1rem'}}>채팅방 이름</p>
        <BsBoxArrowRight style={{fontSize: '1.8rem'}}  />
      </ChatHeader>

      <ChatContainer>
        <DayChat>2024년 12월 19일</DayChat>
        <YourChat>
          상대 채팅
        </YourChat>
        <MyChat>
          내 채팅
        </MyChat>
        <YourChat>
          테스트용 채팅 아주 기이이이이이이이이이이이이일게
        </YourChat>
        <MyChat>
          테스트용 채팅 아주 기이이이이이이이이이이이이일게
        </MyChat>
        <MyChat>
          이렇게
        </MyChat>
      </ChatContainer>
      
      <div> 
        <Search
          allowClear
          enterButton="전송"
          size="large"
          onSearch={onSend}
        />
      </div>
    </ChatRoomContainer>
  )
}

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
`

const Profile = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const ChatContainer = styled.div`
  height: 86%;
  margin-bottom: 1rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 0.5rem;
`

const DayChat = styled.p`
  text-align: center;
`

const MyChat = styled.div`
  align-self: flex-end;
  max-width: 70%;
  border: 1px solid;
  border-radius: 10px;
  padding: 0.3rem 0.5rem;
`

const YourChat = styled.div`
  align-self: flex-start;
  max-width: 70%;
  border: 1px solid;
  border-radius: 10px;
  padding: 0.3rem 0.5rem;
  display: block;
`

export default ChatRoom;