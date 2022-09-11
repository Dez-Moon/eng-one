import React, { useEffect, useState } from "react";
import { authApi } from "../../../../api/auth-api";
import { IUser } from "../../../../models/IUser";
import styles from "./styles.module.scss";

type PropsType = {
  message: {
    message: string;
    userId: string;
    id: string;
    createdAt: string;
    updatedAt: string;
  };
};
const Message = React.memo((props: PropsType) => {
  debugger;
  const { message, userId, id, createdAt, updatedAt } = props.message;

  return (
    <div className={styles.messageItem}>
      <div>
        {/* <img src={user?.img} />
      </div>
      <div className={styles.messageContainer}>
        <div className={styles.message}>
          <div className={styles.userName}>{user?.email}</div>
          <div>
            {message} <div className={styles.time}>11:22</div>
          </div>
        </div>
        <div className={styles.triangle}></div> */}
      </div>
    </div>
  );
});

export default Message;
