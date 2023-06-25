import { Box, Text, Button } from "@hope-ui/solid";
import { createSignal } from "solid-js";
import { CustomButton } from "../../UI/CustomButton/CustomButton";
import { InputWithTitle } from "../../UI/InputWithTitle/InputWithTitle";
import { IUser } from "../../../types/index.types";
import { isEmail, isLength } from "../SignIn/validation/validation";
import { AuthController } from "../../http/controllers/AuthController/auth.controller";

export const SignUp = () => {
  const [getUser, setUser] = createSignal<IUser>({} as IUser);
  const [getError, setError] = createSignal<string | null>(null);

  async function register(): Promise<void> {
    const { username, email, password } = getUser();
    const isValidForm = !isEmail(email) || !isLength(username) || !isLength(password);
    if (isValidForm) {
      setError('Incorrect form');
      setTimeout(() => setError(null), 2000)
      return;
    };
    const instance = AuthController.getInstance();
    const response = await instance.register(email, password, username);
    if (response.status === 400) {
      setError('This email already exist');
      setTimeout(() => setError(null), 2000);
      return;
    };
    console.log(response.data.data.user);
  };

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
      >Sign In</Text>
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
        onClick={register}
      />
      <Text
        backgroundColor={'transparent'}
        borderColor={'transparent'}
        cursor={"pointer"}
        color={'#E2E2E4'}
        marginTop={10}
      >Sign In</Text>
    </Box>
  )
}
