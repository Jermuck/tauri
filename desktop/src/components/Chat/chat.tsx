import { Box, Text } from "@hope-ui/solid"
import { MyMessage } from "../../UI/MyMessage/MyMessage"

export const Chat = () => {
  return (
    <Box height={737} backgroundColor={'#343A4F'} style={{ "box-sizing": 'border-box' }}>
      <MyMessage id={1} message={'Круто!'} isCheck={false} />
    </Box>
  )
}
