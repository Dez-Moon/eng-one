import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useOutside } from "../../../../hooks/useOutside";
import { AppRootStateType } from "../../../../store/store";
import "./styles.scss";

type PropsType = {
  socket: any;
  messageId: string;
  setContextMenu: React.Dispatch<React.SetStateAction<string>>;
  setEditMode: React.Dispatch<React.SetStateAction<string>>;
  contextMenu: string;
};
const ContextMenu = React.memo((props: PropsType) => {
  const user = useSelector<AppRootStateType>((state) => state.auth.user) as any;
  const { socket, messageId, setContextMenu, setEditMode } = props;
  const { isShow, setIsShow, ref } = useOutside(!!props.contextMenu);
  if (!isShow) {
    setContextMenu("");
    return <div></div>;
  }
  return (
    <div className='contextMenu' ref={ref}>
      <div
        onClick={() => {
          debugger;
          setEditMode(messageId);
          setContextMenu("");
        }}
      >
        Редагувати
      </div>
      <hr />
      <div
        onClick={() => {
          socket.send(
            JSON.stringify({
              method: "message",
              action: "delete",
              userId: user.id,
              messageId: messageId,
            })
          );
          setContextMenu("");
        }}
      >
        Видалити
      </div>
    </div>
  );
});

export default ContextMenu;
