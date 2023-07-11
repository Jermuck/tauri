import { Box } from "@hope-ui/solid";
import { Component, For } from "solid-js";
import { getUser } from "../../../store/UserStore/user.store";
import { CompanionMessage } from "../../UI/CompanionMessage/CompanionMessage";
import { IMyMessage, MyMessage } from "../../UI/MyMessage/MyMessage";

export const Chat: Component<{ messages: () => IMyMessage[] }> = ({ messages }) => {
  return (
    <Box
      height={'100vh'}
      backgroundColor={'#343A4F'}
      style={{ "box-sizing": 'border-box' }}
      overflow={'auto'} 
    >
      <For each={messages()}>
        {el =>
          el.userId === getUser()?.id ? <MyMessage {...el} />
            : <CompanionMessage {...el} />
        }
      </For>
    </Box>
  )
}
