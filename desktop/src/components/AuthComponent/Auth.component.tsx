import { createSignal } from "solid-js";
import { Box, Button, Input, Text } from "@hope-ui/solid";
export const AuthComponent = () => {
  const [getValue, setValue] = createSignal<string | null>(null);
  return (
    <Box display='flex' alignItems='center' flexDirection='column'>
      <Text color='white' size='4xl'>Authorization</Text>
      <Box display='flex' justifyContent='center'>
        <Input color={'white'} onChange={element => setValue(element.target.value)} />
        <Box color={'white'}>{getValue()}</Box>
      </Box>
    </Box>
  )
};

