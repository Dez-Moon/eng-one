import React, { useEffect, useState } from "react";
import "./style.scss";
import { CSSTransition } from "react-transition-group";
import CustomTextField from "../Custom-components/TextField/TextField";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import SendIcon from "@mui/icons-material/Send";
import emoji from "../../assets/emoji/emoji";
import { useSelector } from "react-redux";
import { AppRootStateType } from "../../store/store";
import Message from "./components/Message/Message";

const Chat = () => {
  const [value, setValue] = useState("") as any;
  const [messages, setMessages] = useState([]) as any;
  const [showEmoji, setShowEmoji] = useState(false);
  const auth = useSelector<AppRootStateType>((state) => state.auth) as any;
  const socket = new WebSocket("ws://localhost:3001/");
  useEffect(() => {
    socket.onopen = () => {
      socket.send(JSON.stringify({ method: "message", message: "" }));
    };
    socket.onmessage = (event: any) => {
      const data = JSON.parse(event.data);
      switch (data.method) {
        case "message":
          debugger;
          setMessages(data.messages);
      }
    };
  }, []);

  return (
    <CSSTransition
      in={true}
      unmountOnExit
      timeout={200}
      classNames={"autorization"}
    >
      <div className='chat'>
        <div className='messages'>
          <h1>Чат</h1>
          {messages.map((message: any) => (
            <Message message={message} />
          ))}
        </div>
        <div className='bottomPart'>
          {showEmoji && (
            <div className='emoji'>
              {emoji.map((el) => (
                <div>
                  <div>{el.name}</div>
                  <div className='emojiGroup'>
                    {el.smiles.map((smile) => (
                      <div
                        className='emojiItem'
                        onClick={() => setValue(value + smile)}
                      >
                        {smile}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className='input'>
            <SentimentSatisfiedAltIcon
              onClick={() => setShowEmoji(!showEmoji)}
            />
            <CustomTextField
              label='Повідомлення'
              variant='outlined'
              size='small'
              name='message'
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setValue(e.target.value)
              }
              onKeyPress={(e: any) => {
                if (e.charCode === 13 && value) {
                  setValue("");
                  socket.send(
                    JSON.stringify({
                      message: value,
                      method: "message",
                      id: auth.user.id,
                    })
                  );
                }
              }}
              value={value}
            />
            <SendIcon
              onClick={() => {
                if (value) {
                  setValue("");
                  socket.send(
                    JSON.stringify({
                      message: value,
                      method: "message",
                      id: auth.user.id,
                    })
                  );
                }
              }}
            />
          </div>
        </div>
      </div>
    </CSSTransition>
  );
};

export default Chat;
