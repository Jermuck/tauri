import { Box, Text, Input } from "@hope-ui/solid"
import { Component, createSignal } from "solid-js";

interface IProps {
  title: string;
  mt?: number;
  onChange: (value: string) => void;
  isLine?: boolean;
  type?: "password" | "text";
  placeholder?: string;
  value?: string | null;
}

export const PasswordChangeInput: Component<IProps> = ({
  title, mt, onChange, isLine = true, type = "password",
  value = null, placeholder
}) => {
  return (
    <Box width={560} marginTop={mt}>
      <Box
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={'center'}
      >
        <Text
          fontSize={17}
          cursor={'pointer'}
          color={'#9898B0'}
        >{title}</Text>
        <Input
          color={'#E2E2E4'}
          fontSize={17}
          width={140}
          size={'sm'}
          type={type}
          borderColor={'#9898B0'}
          value={value === null ? '' : value}
          placeholder={placeholder}
          onChange={e => onChange(e.target.value)}
        />
      </Box>
      {isLine && <hr style={{ width: "100%", background: '#4C546F', height: '1px', "margin-top": '10px', }} />}
    </Box>
  )
}
