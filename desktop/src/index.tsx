/* @refresh reload */
import { render } from "solid-js/web";
import { Router, Route, Routes } from "@solidjs/router"
import "./styles.css";
import { HopeProvider } from "@hope-ui/solid";
import { AuthPage } from "../src/Page/AuthPage/AuthPage"
import { HomePage } from "./Page/HomePage/HomePage";
import { createEffect } from "solid-js";
import { App } from "./Page/AppPage/AppPage";
render(
  () => (
    <HopeProvider>
      <Router>
        <Routes>
          <Route component={AuthPage} path='/'></Route>
          <Route component={HomePage} path='/home'></Route>
        </Routes>
      </Router>
    </HopeProvider>
  ),
  document.getElementById("root") as HTMLElement);
