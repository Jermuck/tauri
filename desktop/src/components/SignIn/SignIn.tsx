import { Box, Text } from "@hope-ui/solid"
import { createSignal } from "solid-js"
import { CustomButton } from "../../UI/CustomButton/CustomButton";
import { InputWithTitle } from "../../UI/InputWithTitle/InputWithTitle"
import { isEmail, isLength } from "./validation/validation";
import { AuthController } from "../../http/controllers/AuthController/auth.controller";
import { useNavigate } from "@solidjs/router";

export const SignIn = () => {
  const [getEmail, setEmail] = createSignal<string | null>(null);
  const [getPassword, setPassword] = createSignal<string | null>(null);
  const [getError, setError] = createSignal<string | null>(null);
  const navigate = useNavigate();

  async function authorizate(): Promise<void> {
    if (!isEmail(getEmail()) || !isLength(getPassword())) {
      setError('Incorrect form');
      setTimeout(() => setError(null), 2000)
      return;
    };
    const instance = AuthController.getInstance();
    //@ts-ignore
    const response = await instance.login(getEmail(), getPassword());
    console.log(response.data.data.user);
    navigate('/home');
  }

  return (
    <Box
      width={380}
      height={530}
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
        marginTop={50}
      >Sign In</Text>
      <InputWithTitle
        width={280}
        mt={57}
        title={'Email'}
        setValue={(value) => setEmail(value)}
      />
      <InputWithTitle
        width={280}
        mt={20}
        title={'Password'}
        setValue={(value) => setPassword(value)}
        type={'password'}
      />
      <Text color={'#F44D4D'} position={'absolute'} top={'56%'} fontSize={12}>{getError()}</Text>
      <CustomButton
        title={'Sign In'}
        width={280}
        height={38}
        mt={132}
        onClick={authorizate}
      />
      <Text
        backgroundColor={'transparent'}
        borderColor={'transparent'}
        cursor={"pointer"}
        color={'#E2E2E4'}
        marginTop={10}
      >Create account</Text>
    </Box>
  )
}
