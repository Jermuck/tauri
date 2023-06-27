import { Box, Image } from "@hope-ui/solid"
import { Component, createEffect, createSignal, onMount } from "solid-js"
import Union from "./images/Union.svg";

export const AvatarChange = () => {
  const [isShow, setIsShow] = createSignal<boolean>(false);

  return (
    <Box
      width={140}
      height={140}
      borderRadius={130}
      backgroundColor={!isShow() ? '#252838' : '#000'}
      opacity={!isShow() ? '75' : ''}
      display={'flex'}
      justifyContent={'center'}
      alignItems={'center'}
      marginTop={60}
      onMouseEnter={() => setIsShow(true)}
      onMouseLeave={() => setIsShow(false)}
      position={'relative'}
    >
      <Image src={Union} opacity={isShow() ? '90' : ''} />
      {
        isShow() && <Box
          position={'absolute'}
          color={'#E2E2E4'}
          width={'50%'}
          textAlign={'center'}
          fontWeight={'700'}
          fontSize={18}
          cursor={'pointer'}
        >
          Change
          Avatar
        </Box>
      }
    </Box>
  )
}
