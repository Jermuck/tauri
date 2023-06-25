import { Box, Text, Input } from "@hope-ui/solid";
import type { Component } from "solid-js";

interface IInputWithTitle {
  width: number;
  title: string;
  mt?: number;
  setValue: (value: string) => void;
  type?: 'password' | undefined;
}

export const InputWithTitle: Component<IInputWithTitle> = ({ width, title, mt, setValue, type }) => {

  return (
    <Box
      width={width}
      marginTop={mt}
    >
      <Text
        color={'#9898B0'}
        fontWeight={'500'}
      >{title}</Text>
      <Input
        borderRadius={8}
        height={33}
        borderColor={'transparent'}
        color={'white'}
        backgroundColor={'#252838'}
        marginTop={8}
        type={type}
        onChange={el => setValue(el.target.value)}
      ></Input>
    </Box>
  )
}
