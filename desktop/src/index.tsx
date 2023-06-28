/* @refresh reload */
import { render } from "solid-js/web";
import { Router, Route, Routes, Navigate } from "@solidjs/router"
import "./styles.css";
import { HopeProvider } from "@hope-ui/solid";
import { AuthPage } from "../src/Page/AuthPage/AuthPage"
import { HomePage } from "./Page/HomePage/HomePage";
import { useUpdate } from "./hooks/HttpUpdateTokenHook/http.update";
import { onMount } from "solid-js";
import { ProfilePage } from "./Page/ProfilePage/ProfilePage";
import { getUser } from "../store/UserStore/user.store";

const GlobalRouter = () => {
  const update = useUpdate();

  onMount(async () => {
    await update()
  });

  return (
    <>
      <Route element={getUser() ? <Navigate href={'/home'} /> : <AuthPage />} path='/' />
      <Route element={!getUser() ? <Navigate href={'/'} /> : <HomePage />} path='/home' />
      <Route element={!getUser() ? <Navigate href={'/'} /> : <ProfilePage />} path='/profile' />
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
