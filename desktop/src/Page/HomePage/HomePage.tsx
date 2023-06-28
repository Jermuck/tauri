import { Box } from "@hope-ui/solid";
import { getUser } from "../../../store/UserStore/user.store";

export const HomePage = () => {
  return (
    <Box color={"red"} width={'100%'} height={'100vh'}>{JSON.stringify(getUser())}</Box>
  )
}
