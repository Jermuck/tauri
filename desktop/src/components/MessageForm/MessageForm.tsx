import { Box, Button, Image, Input, Text } from "@hope-ui/solid";
import { getCompanion, setCompanion } from "../../../store/CompanionStore/companion.store";
import Attach from "./images/Attach.svg";
import { Chat } from "../Chat/chat";
import { createEffect, createSignal, onMount } from "solid-js";
import { IMyMessage } from "../../UI/MyMessage/MyMessage";
import { CreateDtoMessage, IDeleteRoomDto, IDeleteRoomResponse, ISocketMessageResponse } from "../../../types/index.types";
import { getAsyncMessages } from "./HttpHookForGetMessages/hook.http";
import { getRooms, setMessageByRoom, setMessageRoomIncludeDelete, setMessageRoomWhenSearchHaveLength } from "../../../store/OpenRoomStore/room.store";
import { getUser } from "../../../store/UserStore/user.store";
import { io } from "socket.io-client";
import { getSearch } from "../../../store/GlobalInputSearch/globalSearch.store";


export const MessageForm = () => {
  const [getMessages, setMessages] = createSignal<IMyMessage[]>([]);
  const [getValue, setValue] = createSignal<string>('');

  const socket = io('http://localhost:8080', {
    extraHeaders: {
      Authorization: `Bearer ${localStorage.getItem('access')}`
    }
  });

  function createMessage(msg: string) {
    if (msg.length === 0) return;
    const newMessage: CreateDtoMessage = {
      //@ts-ignore
      conversationId: getCompanion()?.id,
      message: msg,
    };
    socket.emit('msgToServer', newMessage);
    setValue('');
  };

  function onEnter(event: KeyboardEvent): void {
    if (event.key !== 'Enter') return;
    createMessage(getValue());
  }

  socket.on('message', (msg: ISocketMessageResponse<IMyMessage>) => {
    const { data } = msg;
    if (data.userId === getCompanion()?.id || data.userId === getUser()?.id) {
      setMessages(prev => [...prev, { ...data, time: new Date(data.time) }]);
    }
    setMessageByRoom(data.userId, data.conversationId, data);
  });

  socket.on('room', (msg: ISocketMessageResponse<IDeleteRoomResponse>) => {
    setMessageRoomIncludeDelete(msg.data);
    setCompanion(null);
  });

  createEffect(async () => {
    if (!getCompanion()?.id) return;
    //@ts-ignore
    const messages = await getAsyncMessages(getCompanion()?.id);
    setMessages(messages);
  });

  async function deleteRoom(): Promise<void> {
    const room = getRooms().find(room => room.id === getCompanion()?.id);
    if (!room?.roomId) return;
    const deleteRoomDto: IDeleteRoomDto = {
      roomId: room.roomId,
      //@ts-ignore
      conversationId: getCompanion()?.id
    };
    socket.emit('deleteRoom', deleteRoomDto);
    const objectDeleteRoom = {
      conversationRoomId: deleteRoomDto.roomId,
      userRoomId: deleteRoomDto.roomId
    }
    if(getSearch().length === 0){
      setMessageRoomIncludeDelete(objectDeleteRoom);
    }else{
      setMessageRoomWhenSearchHaveLength(objectDeleteRoom)
    }
    setCompanion(null);
  };

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
              justifyContent={'space-between'}
            >
              <Box display={'flex'} alignItems={'center'} width={400} marginLeft={20}>
                <Box width={50} height={50} borderRadius={25} backgroundColor={'#343A4F'} />
                <Text color={'#E2E2E4'} fontSize={18} marginLeft={20}>{getCompanion()?.username}</Text>
              </Box>
              <Button backgroundColor={'rgb(51, 105, 249)'} onClick={deleteRoom} marginRight={20}>Delete</Button>
            </Box>
            <Chat messages={getMessages} />
            <Box
              height={77}
              width={'100%'}
              backgroundColor={'#252838'}
              display={'flex'}
              alignItems={'center'}
              justifyContent={'space-between'}
            >
              <Box display={'flex'} alignItems={'center'} width={800} marginLeft={20}>
                <Image src={Attach}/>
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
              </Box>
              <Button backgroundColor={'#3369F9'} onClick={() => createMessage(getValue())} marginRight={20}>Send</Button>
            </Box>

          </Box>
      }
    </Box>
  )
}
