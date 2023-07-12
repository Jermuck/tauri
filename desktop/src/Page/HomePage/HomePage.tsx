import { useNavigate } from "@solidjs/router";
import { ChatPanel } from "../../components/ChatPanel/ChatPanel";
import { MessageForm } from "../../components/MessageForm/MessageForm";
import { Theme } from "../../UI/Theme/Theme";
import { io } from "socket.io-client";

export const socket = io('http://localhost:8080', {
  extraHeaders: {
    Authorization: `Bearer ${localStorage.getItem('access')}`
  }
});

export const HomePage = () => {
  return (
    <Theme background={'#343A4F'} jstCon={'none'}>
      <ChatPanel />
      <MessageForm />
    </Theme>
  )
}
