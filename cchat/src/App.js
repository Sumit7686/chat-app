import "./App.css";
// import socketIO from "socket.io-client";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Join from "./Component/Join/Join";
import Chat from "./Component/Chat/Chat";

// const ENDPOINT = "http://localhost:7878";
// const socket = socketIO(ENDPOINT, { transports: ["websocket"] });

function App() {
  // socket.on("connect", () => {});

  return (
    <div className="App">
      <Router>
        <Route exact path="/" component={Join} />
        <Route exact path="/chat" component={Chat} />
      </Router>
    </div>
  );
}

export default App;
