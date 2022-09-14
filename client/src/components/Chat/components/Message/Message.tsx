import React, { useEffect, useRef, useState } from "react";
import ContextMenu from "../ContextMenu/ContextMenu";
import styles from "./styles.module.scss";
import UserImg from "../../../../assets/user-icon.png";
import EditMessage from "../EditMessage/EditMessage";
import { ChatMessageType } from "../../types/types";
import { getTimeCurrentLocation } from "../../../../functions/functions";
import { useSelector } from "react-redux";
import { AppRootStateType } from "../../../../store/store";
import { AuthInitialStateType } from "../../../../store/auth-reducer";
import { duration } from "@mui/material";

type PropsType = {
  index: number;
  contextMenu: any;
  setContextMenu: any;
  message: ChatMessageType;
  socket: any;
  editMode: string;
  setEditMode: React.Dispatch<React.SetStateAction<string>>;
};
const Message = React.memo((props: PropsType) => {
  const [widthForTextArea, setWidthForTextArea] = useState<number>(0);
  const auth = useSelector<AppRootStateType, AuthInitialStateType>(
    (state) => state.auth
  );
  const { message, user, id, createdAt, updatedAt } = props.message;
  const style =
    (props.contextMenu || props.editMode) === props.message.id
      ? { zIndex: 2 }
      : {};
  const contextMenu = (e: any) => {
    e.preventDefault();
    if (auth.user.id === user.id) {
      props.setContextMenu(id);
    }
  };
  const messageRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (messageRef.current) {
      setWidthForTextArea(messageRef.current.offsetWidth);
    }
  }, []);

  if (props.editMode === id)
    return (
      <EditMessage
        message={props.message}
        style={style}
        setEditMode={props.setEditMode}
        widthForTextArea={widthForTextArea}
        socket={props.socket}
        setContextMenu={props.setContextMenu}
        editMode={props.editMode}
      />
    );

  return (
    <div
      className={styles.messageItem}
      style={style}
      ref={messageRef}
      onContextMenu={contextMenu}
    >
      {props.contextMenu === id && (
        <ContextMenu
          socket={props.socket}
          messageId={id}
          setContextMenu={props.setContextMenu}
          setEditMode={props.setEditMode}
          contextMenu={props.contextMenu}
        />
      )}
      <div className={styles.photo}>
        <img src={user.img || UserImg} />
        {user.status === "online" && (
          <div className={styles.onlineIndicator}></div>
        )}
      </div>
      <div className={styles.messageContainer}>
        <div className={styles.message}>
          <div className={styles.userName}>{user.login}</div>
          <div>
            {message}
            <div className={styles.time}>
              {createdAt === updatedAt ? (
                <span>{getTimeCurrentLocation(createdAt)}</span>
              ) : (
                <span>
                  <span className={styles.wordChange}>Изменено</span>
                  {getTimeCurrentLocation(updatedAt)}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.triangle}>
        <div></div>
      </div>
    </div>
  );
});

export default Message;
