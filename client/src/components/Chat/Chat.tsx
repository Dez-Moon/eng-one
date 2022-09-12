import React, {
  createRef,
  RefObject,
  useEffect,
  useRef,
  useState,
} from "react";
import "./style.scss";
import { CSSTransition } from "react-transition-group";
import CustomTextField from "../Custom-components/TextField/TextField";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import SendIcon from "@mui/icons-material/Send";
import emoji from "../../assets/emoji/emoji";
import { useSelector } from "react-redux";
import { AppRootStateType } from "../../store/store";
import Message from "./components/Message/Message";
import Button from "../Custom-components/Buttons/Button";
import roles from "../../roles for administrator rights/roles";
import ExpandCircleDownIcon from "@mui/icons-material/ExpandCircleDown";
import { useBeforeunload } from "react-beforeunload";
import Emoji from "./components/Emoji/Emoji";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const Chat = () => {
  const [value, setValue] = useState("") as any;
  const [messages, setMessages] = useState([]) as any;
  const [showEmoji, setShowEmoji] = useState(false);
  const [open, setOpen] = useState(false);
  const auth = useSelector<AppRootStateType>((state) => state.auth) as any;
  const socket = new WebSocket(process.env.REACT_APP_WEBSOCKET as any);
  const [scrollHeight, setScrollHeight] = useState() as any;
  const [offsetHeight, setOffsetHeight] = useState() as any;
  const [scrollTop, setScrollTop] = useState() as any;
  const [contextMenu, setContextMenu] = useState("") as any;
  useEffect(() => {
    socket.onopen = () => {
      socket.send(
        JSON.stringify({ method: "connection", userId: auth.user.id })
      );
      socket.send(
        JSON.stringify({ method: "message", action: "get-messages" })
      );
    };
    socket.onmessage = (event: any) => {
      const data = JSON.parse(event.data);
      switch (data.method) {
        case "message":
          setMessages(data.messages);
      }
    };
  }, []);
  socket.onclose = function () {};
  useBeforeunload((event) => {
    socket.send(JSON.stringify({ method: "disconect", userId: auth.user.id }));
    socket.close();
  });
  const messagesRef = useRef() as any;
  useEffect(() => {
    setTimeout(() => {
      if (messagesRef.current) {
        messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
        setTimeout(() => {
          setOffsetHeight(messagesRef.current.offsetHeight);
        }, 1000);
        setScrollHeight(messagesRef.current.scrollHeight);
      }
    }, 0);
  }, [open]);
  const sendMessage = (message: string) => {
    setValue("");
    socket.send(
      JSON.stringify({
        message: message,
        method: "message",
        action: "send",
        id: auth.user.id,
      })
    );
    messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
  };

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
            onClick={() => setOpen(false)}
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
          )}{" "}
          <h1>Чат</h1>
          <div
            className='messages'
            ref={messagesRef}
            onScroll={(e: any) => {
              setScrollTop(e.currentTarget.scrollTop);
            }}
          >
            {contextMenu && <div className='backgroundBlurOnContext'></div>}

            {messages.map((message: any, index: number) => (
              <Message
                style={message.id === contextMenu ? { zIndex: 2 } : {}}
                message={message}
                index={index}
                contextMenu={contextMenu}
                setContextMenu={setContextMenu}
                socket={socket}
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
          <div className='bottomPart'>
            {showEmoji && <Emoji value={value} setValue={setValue} />}
            <div className='input'>
              <SentimentSatisfiedAltIcon
                onClick={() => setShowEmoji(!showEmoji)}
              />
              <CustomTextField
                label='Повідомлення'
                variant='outlined'
                size='small'
                name='message'
                autoComplete='new-password'
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setValue(e.target.value)
                }
                onKeyPress={(e: any) => {
                  if (e.charCode === 13 && value) {
                    sendMessage(value);
                  }
                }}
                value={value}
              />
              <SendIcon
                onClick={() => {
                  if (value) {
                    sendMessage(value);
                  }
                }}
              />
              {!auth.isAuth && (
                <div className='notAuthorizedBackdrop'>Не авторизован</div>
              )}
            </div>
          </div>
        </div>
      </CSSTransition>
    </div>
  );
};

export default Chat;
