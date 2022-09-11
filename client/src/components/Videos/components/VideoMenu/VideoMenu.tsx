import React from "react";
import styles from "./styles.module.scss";
import { useDispatch } from "react-redux";
import { deleteVideoTC } from "../../../../store/videos-reducer";

type PropsType = {
  video: any;
  setMenuOpen: any;
};
const VideoMenu = React.memo((props: PropsType) => {
  const dispatch = useDispatch();

  return (
    <div className={styles.videoMenu}>
      <div className={styles.videoMenuItem}>Редактировать</div>
      <div
        className={styles.videoMenuItem}
        onClick={async () => {
          const thunk = deleteVideoTC(props.video._id);
          thunk(dispatch);
          props.setMenuOpen(false);
        }}
      >
        Удалить
      </div>
    </div>
  );
});

export default VideoMenu;
