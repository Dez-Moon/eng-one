import React, { useState } from "react";
import { IUser } from "../../../../models/IUser";
import styles from "./styles.module.scss";
import UserIcon from "../../../../assets/user-icon.png";
import { getTimeLastOnline } from "../../../../functions/getTimeLastOnline";

type PropsType = {
  user: IUser;
  index: number;
};

const User = React.memo((props: PropsType) => {
  const [wasOnline, setWasOnline] = useState({
    index: null as any,
    value: null as any,
  }) as any;

  return (
    <div className={styles.user}>
      <div>
        <img src={props.user.img || UserIcon} />
      </div>
      <div className={styles.userInfo}>
        <div>{props.user.email}</div>
        <div className={styles.isActivated}>
          {props.user.isActivated ? (
            <span className={styles.activated}>Аккаунт активовано</span>
          ) : (
            <span className={styles.notActivated}>Аккаунт не активовано</span>
          )}
        </div>
        <div>{props.user.role}</div>
        <div
          className={styles.status}
          onMouseOver={() => {
            if (props.user.status === "offline") {
              setWasOnline({
                index: props.index,
                value: getTimeLastOnline(props.user.wasOnline),
              });
            }
          }}
          onMouseOut={() => {
            setWasOnline({
              index: null,
              value: null,
            });
          }}
        >
          <span
            className={
              props.user.status === "online" ? styles.online : styles.offline
            }
          >
            {props.user.status}
          </span>
        </div>
        {wasOnline.index === props.index && (
          <div className={styles.wasOnline}>{wasOnline.value}</div>
        )}
      </div>
    </div>
  );
});

export default User;
