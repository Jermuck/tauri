import { Box, Text } from "@hope-ui/solid";
import { Component } from "solid-js";

interface IProps {
  title: string;
  value?: string;
  mt?: number;
  isLine?: boolean;
  colorTitle?: string;
  onClick?: () => void;
}
export const SettingItem: Component<IProps> = ({
  title, value, mt, isLine = true, colorTitle = '#9898B0', onClick
}) => {
  return (
    <Box width={560} marginTop={mt}>
      <Box
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={'center'}
      >
        <Text
          color={colorTitle}
          fontSize={17}
          cursor={'pointer'}
          onClick={onClick}
        >{title}</Text>
        <Text
          color={'#E2E2E4'}
          fontSize={17}
        >{value}</Text>
      </Box>
      {isLine && <hr style={{ width: "100%", background: '#4C546F', height: '1px', "margin-top": '10px' }} />}
    </Box>
  )
}
