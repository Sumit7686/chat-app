import React, { useEffect } from "react";
import socketIo from "socket.io-client";
// import { user } from "../Join/Join";
import sendLogo from "../../images/send.png";
import "./Chat.css";

const ENDPOINT = "http://localhost:7878/";
// const socket = socketIO(ENDPOINT, { transports: ["websocket"] });

const Chat = () => {
  const socket = socketIo(ENDPOINT, { transports: ["websocket"] });

  useEffect(() => {
    socket.on("connect", () => {
      alert("Connected...");
    });
  }, [socket]);

  return (
    <div className="ChatPage">
      <div className="ChatContainer">
        <div className="header"></div>
        <div className="ChatBox"></div>
        <div className="InputBox">
          <input type="text" id="ChatInput" />
          <button className="SendButton">
            <img src={sendLogo} alt="sendLogo" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
