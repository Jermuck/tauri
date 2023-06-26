import { Box, Text } from "@hope-ui/solid";
import { Component, createSignal } from "solid-js";
import { CustomButton } from "../../UI/CustomButton/CustomButton";
import { InputWithTitle } from "../../UI/InputWithTitle/InputWithTitle";
import { ISignChange, IUser } from "../../../types/index.types";
import { useRegister } from "./HtttpHookForRegistration/http.hook";

export const SignUp: Component<ISignChange> = ({ change }) => {
  const [getUser, setUser] = createSignal<IUser>({} as IUser);
  const { getError, register } = useRegister();
  return (
    <Box
      width={380}
      height={580}
      borderRadius={12}
      boxShadow={'0px 0px 6px 0px rgba(0, 0, 0, 0.14)'}
      backgroundColor={'#343A4F'}
      display={'flex'}
      flexDirection={'column'}
      alignItems={'center'}
    >
      <Text
        color={'#E2E2E4'}
        fontWeight={'500'}
        fontSize={28}
        textAlign={'center'}
        marginTop={57}
      >Sign Up</Text>
      <InputWithTitle
        width={280}
        mt={30}
        title={'Email'}
        setValue={(value) => setUser({ ...getUser(), email: value })}
      />
      <InputWithTitle
        width={280}
        mt={20}
        title={'Login'}
        setValue={(value) => setUser({ ...getUser(), username: value })}
      />
      <InputWithTitle
        width={280}
        mt={20}
        title={'Password'}
        setValue={(value) => setUser({ ...getUser(), password: value })}
        type={'password'}
      />
      <Text color={'#F44D4D'} position={'absolute'} top={'65%'} fontSize={12}>{getError()}</Text>
      <CustomButton
        title={'Next'}
        width={280}
        height={38}
        mt={100}
        onClick={() => register(getUser())}
      />
      <Text
        backgroundColor={'transparent'}
        borderColor={'transparent'}
        cursor={"pointer"}
        color={'#E2E2E4'}
        marginTop={10}
        onClick={() => change("SignIn")}
      >Sign In</Text>
    </Box>
  )
}
