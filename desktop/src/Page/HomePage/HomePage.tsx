import { useUserFromStore } from "../../../store/UserStore/user.store";
import { Box } from "@hope-ui/solid";
import { createEffect } from "solid-js";

export const HomePage = () => {
  const [user, _] = useUserFromStore();
  return (
    <Box color={"black"}>T</Box>
  )
}
