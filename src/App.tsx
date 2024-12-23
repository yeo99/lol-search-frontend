import "./App.css";
import Layout from "./components/layout/Layout";
import { GlobalStyle } from "./style/global";
import WriteForm from "./pages/Board/WriteForm";
import { ConfigProvider } from "antd";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PostList from "./pages/Board/PostList";
import ChatList from "./pages/Chat/ChatList";
import ChatAdd from "./pages/Chat/ChatAdd";
import ChatRoom from "./pages/Chat/ChatRoom";
import ViewPost from "./pages/Board/ViewPost";
import UpdatePost from "./pages/Board/UpdatePost";
import UserStats from "./pages/userStat/UserStat";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Layout>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#054762",
            },
          }}
        >
          <Routes>
            <Route path="/" element={<ChatList />} />
            <Route path="/chat/add" element={<ChatAdd />} />
            <Route path="/chat/:roomId" element={<ChatRoom />} />
            <Route path="/board/write" element={<WriteForm />} />
            <Route path="/board/list" element={<PostList />} />
            <Route path="/board/view/:postId" element={<ViewPost />} />
            <Route path="/board/update/:postId" element={<UpdatePost />} />
            <Route path="/user/search" element={<UserStats />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </ConfigProvider>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
