import { HopeProvider, HopeThemeConfig } from "@hope-ui/solid";
import "./App.css";
import { AuthComponent } from "./components/AuthComponent/Auth.component";

function App() {

  return (
    <HopeProvider >
      <div style={{ background: '#171923', width: "100%", height: "100vh" }}>
        <AuthComponent />
      </div>
    </HopeProvider>
  );
}

export default App;
