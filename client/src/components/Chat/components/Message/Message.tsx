import React, { useEffect, useState } from "react";
import { authApi } from "../../../../api/auth-api";
import { IUser } from "../../../../models/IUser";
import styles from "./styles.module.scss";

type PropsType = {
  message: {
    message: string;
    user: { id: string; login: string; img: string; status: string };
    id: string;
    createdAt: string;
    updatedAt: string;
  };
};
const Message = React.memo((props: PropsType) => {
  const { message, user, id, createdAt, updatedAt } = props.message;
  const time = createdAt.substr(11, 5);
  debugger;
  return (
    <div className={styles.messageItem}>
      <div>
        <img src={user.img} />
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
