import { useEffect, useRef, useState } from "react";
import "./style.scss";
import { CSSTransition } from "react-transition-group";
import { useSelector } from "react-redux";
import { AppRootStateType } from "../../store/store";
import Message from "./components/Message/Message";
import Button from "../Custom-components/Buttons/Button";
import roles from "../../roles for administrator rights/roles";
import ExpandCircleDownIcon from "@mui/icons-material/ExpandCircleDown";
import { useBeforeunload } from "react-beforeunload";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ChatInputPart from "./components/ChatInputPart/ChatInputPart";
import { ChatMessageType } from "./types/types";
import { AuthInitialStateType } from "../../store/auth-reducer";
import io from "socket.io-client";
import { createSocketObject } from "../../web sockets/web-sockets";

const Chat = () => {
  const [value, setValue] = useState<string>("");
  const [messages, setMessages] = useState<Array<ChatMessageType>>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<string>("");
  const auth = useSelector<AppRootStateType>(
    (state) => state.auth
  ) as AuthInitialStateType;
  const [scrollHeight, setScrollHeight] = useState() as any;
  const [offsetHeight, setOffsetHeight] = useState() as any;
  const [scrollTop, setScrollTop] = useState() as any;
  const [contextMenu, setContextMenu] = useState("") as any;

  const socket = new WebSocket(process.env.REACT_APP_WEBSOCKET as any);

  useEffect(() => {
    socket.onopen = () => {
      socket.send(JSON.stringify(createSocketObject("message")));
    };

    socket.onmessage = (event: any) => {
      const data = JSON.parse(event.data);
      console.log(data);
      switch (data.method) {
        case "message":
          setMessages(data.messages);
      }
    };
    socket.onclose = (event: any) => {
      socket.send(
        JSON.stringify({ method: "disconect", userId: auth.user.id })
      );
    };
  }, []);

  const messagesRef = useRef() as any;
  useEffect(() => {
    if (messagesRef.current) {
      setTimeout(() => {
        if (messagesRef.current)
          setOffsetHeight(messagesRef.current.offsetHeight);
      }, 1000);
      setScrollHeight(messagesRef.current.scrollHeight);
    }
  }, [messages]);
  useEffect(() => {
    if (messagesRef.current) {
      setTimeout(() => {
        messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
      }, 0);
      setTimeout(() => {
        if (messagesRef.current)
          setOffsetHeight(messagesRef.current.offsetHeight);
      }, 1000);
      setScrollHeight(messagesRef.current.scrollHeight);
    }
  }, [editMode]);
  useEffect(() => {
    setTimeout(() => {
      if (messagesRef.current) {
        messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
        setTimeout(() => {
          if (messagesRef.current)
            setOffsetHeight(messagesRef.current.offsetHeight);
        }, 1000);
        setScrollHeight(messagesRef.current.scrollHeight);
      }
    }, 0);
  }, [open]);
  return (
    <div className='chatContainer'>
      <div onClick={() => setOpen(true)} className='chatBtn'>
        Чат
      </div>
      <CSSTransition
        in={open}
        unmountOnExit
        timeout={open ? 0 : 200}
        classNames={"chat"}
      >
        <div className='chat'>
          <ExpandCircleDownIcon
            className='buttonHideChat'
            onClick={() => {
              setOpen(false);
              setTimeout(() => {
                setContextMenu("");
                setEditMode("");
              }, 200);
            }}
          />
          {roles.has(auth.user.role) && (
            <div className='clearButton'>
              <Button
                title='Очистити чат'
                onClick={() => {
                  socket.send(
                    JSON.stringify({
                      method: "message",
                      action: "clear",
                    })
                  );
                }}
                style={{ fontSize: "12px" }}
              />
            </div>
          )}
          <h1>Чат</h1>
          <div
            className='messages'
            ref={messagesRef}
            onScroll={(e: any) => {
              setScrollTop(e.currentTarget.scrollTop);
            }}
          >
            {(contextMenu || editMode) && (
              <div className='backgroundBlurOnContext'></div>
            )}

            {messages.map((message: any, index: number) => (
              <Message
                message={message}
                index={index}
                contextMenu={contextMenu}
                setContextMenu={setContextMenu}
                socket={socket}
                editMode={editMode}
                setEditMode={setEditMode}
              />
            ))}
            {scrollTop + offsetHeight < scrollHeight && (
              <KeyboardArrowDownIcon
                className='scrollMessagesBtn'
                onClick={() => {
                  messagesRef.current.scrollTop =
                    messagesRef.current.scrollHeight;
                }}
              />
            )}
          </div>
          <ChatInputPart
            value={value}
            setValue={setValue}
            socket={socket}
            messagesRef={messagesRef}
          />
        </div>
      </CSSTransition>
    </div>
  );
};

export default Chat;
