import React, { useState } from "react";
import CustomTextField from "../../../Custom-components/TextField/TextField";
import Emoji from "../Emoji/Emoji";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import SendIcon from "@mui/icons-material/Send";
import { useSelector } from "react-redux";
import { AppRootStateType } from "../../../../store/store";
import { AuthInitialStateType } from "../../../../store/auth-reducer";

type PropsType = {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  messagesRef: any;
  socket: any;
};
const ChatInputPart = React.memo((props: PropsType) => {
  const auth = useSelector<AppRootStateType>(
    (state) => state.auth
  ) as AuthInitialStateType;
  const [showEmoji, setShowEmoji] = useState(false);
  const { value, setValue, messagesRef, socket } = props;
  const sendMessage = (message: string) => {
    setValue("");
    socket.send(
      JSON.stringify({
        message: message,
        method: "message",
        action: "send",
        userId: auth.user.id,
      })
    );
    setTimeout(() => {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }, 0);
  };
  return (
    <div className='inputPart'>
      {showEmoji && <Emoji value={value} setValue={setValue} />}
      <div className='input'>
        <SentimentSatisfiedAltIcon onClick={() => setShowEmoji(!showEmoji)} />
        <CustomTextField
          label='Повідомлення'
          variant='outlined'
          size='small'
          name='message'
          autoFocus={auth.isAuth && true}
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
  );
});

export default ChatInputPart;
