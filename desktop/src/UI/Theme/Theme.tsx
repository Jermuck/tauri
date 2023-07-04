import { Box, Spinner } from "@hope-ui/solid";
import { JSXElement, Component } from "solid-js";
import { getLoading } from "../../../store/LoadingStore/loading.store";

interface ITheme {
  children: JSXElement | JSXElement[];
  background?: string | undefined;
  jstCon?: string | undefined;
}

export const Theme: Component<ITheme> = (props) => {

  return (
    <Box
      width={'100%'}
      height={'100vh'}
      display={'flex'}
      background={props.background ? props.background : '#252838'}
      alignItems={'center'}
      justifyContent={props.jstCon ? props.jstCon : 'center'}
      position={'relative'}
    >
      {getLoading()
        && <Box
          width={'100%'}
          height={'100vh'}
          display={'flex'}
          justifyContent={'center'}
          alignItems={'center'}
          position={'absolute'}
          backgroundColor={'rgba(0, 0, 0, 0.4)'}
          zIndex={100}
        >
          <Spinner
            color={'white'}
            size={'xl'}
            speed={'0.7s'}
          />
        </Box>
      }
      {props.children}
    </Box>
  )
}

