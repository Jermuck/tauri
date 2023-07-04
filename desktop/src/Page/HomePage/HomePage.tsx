import { Box, Button } from "@hope-ui/solid";
import { useNavigate } from "@solidjs/router";
import { Theme } from "../../UI/Theme/Theme";

export const HomePage = () => {
  const nav = useNavigate();
  return (
    <Theme background={'#343A4F'}>
      <Button onClick={() => nav('/profile')}>Profile</Button>
    </Theme>
  )
}
