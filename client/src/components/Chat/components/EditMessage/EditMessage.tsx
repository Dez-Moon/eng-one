import { TextareaAutosize } from "@mui/material";
import React, { RefObject, useEffect, useRef, useState } from "react";
import { ChatMessageType } from "../../types/types";
import styles from "../Message/styles.module.scss";
import UserImg from "../../../../assets/user-icon.png";
import { createSocketObject } from "../../../../web sockets/web-sockets";
import { useOutside } from "../../../../hooks/useOutside";

type PropsType = {
  message: ChatMessageType;
  style: any;
  widthForTextArea: number;
  setEditMode: React.Dispatch<React.SetStateAction<string>>;
  setContextMenu: React.Dispatch<React.SetStateAction<string>>;
  socket: any;
  editMode: string;
};
const EditMessage = (props: PropsType) => {
  const { style, message, widthForTextArea, setEditMode, socket } = props;
  const [value, setValue] = useState<string>(message.message);
  const styleTextArea = {
    width: widthForTextArea,
    maxWidth: "230px",
  };
  const editMessage = (value: string) => {
    socket.send(
      JSON.stringify(
        createSocketObject("message", "edit", undefined, message.id, value)
      )
    );
    setEditMode("");
  };
  const { isShow, setIsShow, ref } = useOutside(!!props.editMode);
  if (!isShow) {
    editMessage(value);
    return <div></div>;
  }
  return (
    <div className={styles.messageItem} style={style}>
      <div className={styles.photo}>
        <img src={message.user.img || UserImg} />
        {message.user.status === "online" && (
          <div className={styles.onlineIndicator}></div>
        )}
      </div>
      <div className={styles.messageContainer} ref={ref}>
        <TextareaAutosize
          aria-label='empty textarea'
          autoFocus={true}
          value={value}
          style={styleTextArea}
          onFocus={(e: any) => {
            e.currentTarget.selectionStart = e.currentTarget.value.length;
          }}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setValue(e.target.value)
          }
          onKeyPress={(e: React.KeyboardEvent<HTMLTextAreaElement>) => {
            if (e.charCode === 13) {
              editMessage(value);
            }
          }}
        />
      </div>
      <div className={styles.triangle}>
        <div></div>
      </div>
    </div>
  );
};

export default EditMessage;
