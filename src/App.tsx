import "./App.css";
import { Main } from "./components/Main";
import { Providers } from "./context/toastContext";

function App() {
  return (
    <Providers>
      <Main />
    </Providers>
  );
}

export default App;
