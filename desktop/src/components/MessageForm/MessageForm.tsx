import { Box, Button, Image, Input, Text } from "@hope-ui/solid";
import { getCompanion } from "../../../store/CompanionStore/companion.store";
import { Circle } from "./images/Circle";
import Attach from "./images/Attach.svg";
import { Chat } from "../Chat/chat";

export const MessageForm = () => {
  return (
    <Box
      width={"100%"}
      height={'100vh'}
      position={'relative'}
    >
      {
        !getCompanion() ?
          <Box color={'#FFF'} left={'50%'} transform={'translate(-50%)'} top={'50%'} position={'absolute'}>Выберите чат чтобы отправить сообщение</Box>
          : <Box
            width={"100%"}
            height={'100vh'}
            position={'relative'}
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
            <Chat />
            <Box
              height={77}
              width={'100%'}
              backgroundColor={'#252838'}
              display={'flex'}
              alignItems={'center'}
            >
              <Image src={Attach} marginLeft={20} />
              <Input width={600} border={'none'} boxShadow={'none'} placeholder={'message...'} color={'#FFF'} marginLeft={30} />
              <Button backgroundColor={'#3369F9'} marginLeft={190}>Send</Button>
            </Box>

          </Box>
      }
    </Box>
  )
}
