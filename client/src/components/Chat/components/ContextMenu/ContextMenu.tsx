import React from "react";
import { useSelector } from "react-redux";
import { AppRootStateType } from "../../../../store/store";
import "./styles.scss";

type PropsType = {
  socket: any;
  messageId: string;
  setContextMenu: any;
};
const ContextMenu = (props: PropsType) => {
  const user = useSelector<AppRootStateType>((state) => state.auth.user) as any;
  return (
    <div className='contextMenu'>
      <div
        onClick={() => {
          props.socket.send(
            JSON.stringify({ method: "message", action: "edit" })
          );
        }}
      >
        Редагувати
      </div>
      <hr />
      <div
        onClick={() => {
          props.socket.send(
            JSON.stringify({
              method: "message",
              action: "delete",
              userId: user.id,
              messageId: props.messageId,
            })
          );
          props.setContextMenu("");
        }}
      >
        Видалити
      </div>
    </div>
  );
};

export default ContextMenu;
