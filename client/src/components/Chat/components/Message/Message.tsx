import React, { createRef } from "react";
import ContextMenu from "../ContextMenu/ContextMenu";
import styles from "./styles.module.scss";
import UserImg from "../../../../assets/user-icon.png";

type PropsType = {
  index: number;
  contextMenu: any;
  setContextMenu: any;
  style: any;
  message: {
    message: string;
    user: { id: string; login: string; img: string; status: string };
    id: string;
    createdAt: string;
    updatedAt: string;
  };
  socket: any;
};
const Message = React.memo((props: PropsType) => {
  const { message, user, id, createdAt, updatedAt } = props.message;
  const time = createdAt.substr(11, 5);
  const contextMenu = (e: any) => {
    e.preventDefault();
    props.setContextMenu(id);
  };
  return (
    <div
      className={styles.messageItem}
      style={props.style}
      onClick={(e: any) => {
        console.log("left Click");
      }}
      onContextMenu={contextMenu}
    >
      {props.contextMenu === id && (
        <ContextMenu
          socket={props.socket}
          messageId={id}
          setContextMenu={props.setContextMenu}
        />
      )}
      <div>
        <img src={user.img || UserImg} />
      </div>
      <div className={styles.messageContainer}>
        <div className={styles.message}>
          <div className={styles.userName}>{user.login}</div>
          <div>
            {message} <div className={styles.time}>{time}</div>
          </div>
        </div>
        <div className={styles.triangle}>
          <div></div>
        </div>
      </div>
    </div>
  );
});

export default Message;
