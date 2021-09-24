import React, { useEffect, useState } from "react";
import socketIo from "socket.io-client";
import { user } from "../Join/Join";
import sendLogo from "../../images/send.png";
import Message from "../Message/Message";
import ReactScrollTOBottom from "react-scroll-to-bottom";
import closeIcon from "../../images/closeIcon.png";
import "./Chat.css";

const ENDPOINT = "http://localhost:7878/";

let socket;

const Chat = () => {
  const [id, setId] = useState("");
  const [messages, setMessages] = useState([]);

  const send = () => {
    const message = document.getElementById("ChatInput").value;
    socket.emit("message", { message, id });
    document.getElementById("ChatInput").value = "";
  };

  useEffect(() => {
    socket = socketIo(ENDPOINT, { transports: ["websocket"] });

    socket.on("connect", () => {
      alert("connected...");
      setId(socket.id);
    });

    console.log(socket);
    socket.emit("joined", { user });

    socket.on("welcome", (data) => {
      setMessages([...messages, data]);
      console.log("welcome:::", data.user, data.message);
    });

    socket.on("userJoined", (data) => {
      setMessages([...messages, data]);
      console.log("userJoined:::", data.user, data.message);
    });

    socket.on("leave", (data) => {
      setMessages([...messages, data]);
      console.log("leave:::", data.user, data.message);
    });

    return () => {
      socket.emit("disconnect");
      socket.off();
    };
  }, []);

  useEffect(() => {
    socket.on("sendMessage", (data) => {
      setMessages([...messages, data]);
      console.log("data", data);
    });
    return () => {
      socket.off();
    };
  }, [messages]);

  return (
    <div className="ChatPage">
      <div className="ChatContainer">
        <div className="header">
          <h1>C CHAT</h1>
          <a href="/">
            <img src={closeIcon} alt="Close" />
          </a>
        </div>
        <ReactScrollTOBottom className="ChatBox">
          {messages.map((item, inx) => (
            <Message
              user={item.id === id ? "" : item.user}
              message={item.message}
              classs={item.id === id ? "right" : "left"}
            />
          ))}
        </ReactScrollTOBottom>
        <div className="InputBox">
          <input type="text" id="ChatInput" />
          <button onClick={send} className="SendButton">
            <img src={sendLogo} alt="sendLogo" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
