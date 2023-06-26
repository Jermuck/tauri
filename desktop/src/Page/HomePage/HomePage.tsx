import { useUserFromStore } from "../../../store/UserStore/user.store";
import { Box } from "@hope-ui/solid";
import { onMount } from "solid-js";
import { useNavigate } from "@solidjs/router";

export const HomePage = () => {
  const [user, _] = useUserFromStore();
  const nav = useNavigate();
  onMount(() => {
    //@ts-ignore
    if (!user.username) {
      nav('/');
    }
  })
  return (
    <Box color={"red"} width={'100%'} height={'100vh'}>{JSON.stringify(user)}</Box>
  )
}
