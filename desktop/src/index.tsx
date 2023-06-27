/* @refresh reload */
import { render } from "solid-js/web";
import { Router, Route, Routes } from "@solidjs/router"
import "./styles.css";
import { HopeProvider } from "@hope-ui/solid";
import { AuthPage } from "../src/Page/AuthPage/AuthPage"
import { HomePage } from "./Page/HomePage/HomePage";
import { useUpdate } from "./hooks/HttpUpdateTokenHook/http.update";
import { onMount } from "solid-js";
import { ProfilePage } from "./Page/ProfilePage/ProfilePage";

const GlobalRouter = () => {
  const update = useUpdate();
  onMount(async () => await update());
  return (
    <>
      <Route component={AuthPage} path='/' />
      <Route component={HomePage} path='/home' />
      <Route component={ProfilePage} path='/profile' />
    </>
  )
}
render(
  () => (
    <HopeProvider>
      <Router>
        <Routes>
          <GlobalRouter />
        </Routes>
      </Router>
    </HopeProvider>
  ),
  document.getElementById("root") as HTMLElement);
