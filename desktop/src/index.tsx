/* @refresh reload */
import { render } from "solid-js/web";
import { Router, Route, Routes } from "@solidjs/router"
import "./styles.css";
import { HopeProvider } from "@hope-ui/solid";
import { AuthPage } from "../src/Page/AuthPage/AuthPage"
render(
  () => (
    <HopeProvider>
      <Router>
        <Routes>
          <Route component={AuthPage} path='/'></Route>
        </Routes>
      </Router>
    </HopeProvider>
  ),
  document.getElementById("root") as HTMLElement);
