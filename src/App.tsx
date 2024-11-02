import "./App.css";
import AppContainer from "./components/AppContainer";
import Header from "./components/header/Header";
import { WebSocketProvider } from "./providers/WebSocketProvider";

function App() {
  return (
    <>
      <Header />
      <WebSocketProvider>
        <AppContainer />
      </WebSocketProvider>
    </>
  );
}

export default App;
