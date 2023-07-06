import { Box, Button } from "@hope-ui/solid";
import { useNavigate } from "@solidjs/router";
import { ChatPanel } from "../../components/ChatPanel/ChatPanel";
import { MessageForm } from "../../components/MessageForm/MessageForm";
import { Theme } from "../../UI/Theme/Theme";

export const HomePage = () => {
  const nav = useNavigate();
  return (
    <Theme background={'#343A4F'} jstCon={'none'}>
      <ChatPanel />
      <MessageForm />
    </Theme>
  )
}
