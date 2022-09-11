import React from "react";
import Button from "../../../Custom-components/Buttons/Button";
import styles from "./styles.module.scss";

type PropsType = {
  filter: any;
  setFilter: any;
  setUsers: any;
};
const UsersShown = React.memo((props: PropsType) => {
  return (
    <div className={styles.usersShown}>
      <Button
        title='Приховати користувачів'
        onClick={() => {
          props.setUsers(null);
        }}
      />
      <span
        className={props.filter === "all" ? styles.selected : ""}
        onClick={() => {
          props.setFilter("all");
        }}
      >
        all
      </span>
      <span
        className={
          props.filter === "online"
            ? styles.online + " " + styles.selected
            : styles.online
        }
        onClick={() => {
          props.setFilter("online");
        }}
      >
        online
      </span>
      <span
        className={
          props.filter === "offline"
            ? styles.offline + " " + styles.selected
            : styles.offline
        }
        onClick={() => {
          props.setFilter("offline");
        }}
      >
        ofline
      </span>
    </div>
  );
});

export default UsersShown;
