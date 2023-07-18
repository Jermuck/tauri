import { Box, Button, Image, Input, Text } from "@hope-ui/solid";
import { getCompanion } from "../../../store/CompanionStore/companion.store";
import { Circle } from "./images/Circle";
import Attach from "./images/Attach.svg";
import { Chat } from "../Chat/chat";
import { createEffect, createSignal, onMount } from "solid-js";
import { IMyMessage } from "../../UI/MyMessage/MyMessage";
import { CreateDtoMessage, ISocketMessageResponse } from "../../../types/index.types";
import { getAsyncMessages } from "./HttpHookForGetMessages/hook.http";
import { socket } from "../../Page/HomePage/HomePage";
import { setMessageByRoom } from "../../../store/openRoomStore/room.store";

export const MessageForm = () => {
  const [getMessages, setMessages] = createSignal<IMyMessage[]>([]);
  const [getValue, setValue] = createSignal<string>('');

  function createMessage(msg: string) {
    if(msg.length === 0) return;
    const newMessage: CreateDtoMessage = {
      //@ts-ignore
      conversationId: getCompanion()?.id,
      message: msg,
    };
    socket.emit('msgToServer', newMessage);
    setValue('');
  };

  function onEnter(event: KeyboardEvent):void{
    if(event.key !== 'Enter') return;
    createMessage(getValue());
  }

  socket.on('message', (msg: ISocketMessageResponse<IMyMessage>) => {
    const { data } = msg;
    setMessages(prev => [...prev, { ...data, time: new Date(data.time) }]);
    setMessageByRoom(data.userId, data.conversationId, data.message);
  });

  createEffect(async () => {
    if(!getCompanion()?.id) return;
    //@ts-ignore
    const messages = await getAsyncMessages(getCompanion()?.id);
    setMessages(messages);
  });

  return (
    <Box
      width={'100%'}
      height={'100vh'}
      position={'relative'}
    >
      {
        !getCompanion() ?
          <Box color={'#FFF'} left={'50%'} transform={'translate(-50%)'} top={'50%'} position={'absolute'}>Выберите чат чтобы отправить сообщение</Box>
          : <Box
            width={"100%"}
            height={'100vh'}
            display={'flex'}
            flexDirection={'column'}
            justifyContent={'space-between'}
            onKeyUp={onEnter}
          >
            <Box
              height={77}
              backgroundColor={'#252838'}
              display={'flex'}
              alignItems={'center'}
            >
              <Box width={50} height={50} borderRadius={25} backgroundColor={'#343A4F'} marginLeft={20} />
              <Text color={'#E2E2E4'} fontSize={18} marginLeft={20}>{getCompanion()?.username}</Text>
              <Circle onClick={() => { }} />
            </Box>
            <Chat messages={getMessages} />
            <Box
              height={77}
              width={'100%'}
              backgroundColor={'#252838'}
              display={'flex'}
              alignItems={'center'}
            >
              <Image src={Attach} marginLeft={20} />
              <Input
                width={600}
                border={'none'}
                boxShadow={'none'}
                placeholder={'message...'}
                color={'#FFF'}
                marginLeft={30}
                value={getValue()}
                onInput={element => setValue(element.target.value)}
              />
              <Button backgroundColor={'#3369F9'} marginLeft={190} onClick={() => createMessage(getValue())}>Send</Button>
            </Box>

          </Box>
      }
    </Box>
  )
}
