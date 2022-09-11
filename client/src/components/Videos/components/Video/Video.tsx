import React, { useState } from "react";
import styles from "./styles.module.scss";
import SettingsIcon from "@mui/icons-material/Settings";
import VideoMenu from "../VideoMenu/VideoMenu";
import { CircularProgress } from "@mui/material";
import { useSelector } from "react-redux";
import { AppRootStateType } from "../../../../store/store";

type PropsType = {
  video: any;
};
const Video = React.memo((props: PropsType) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [load, setLoad] = useState(false);
  const role = useSelector<AppRootStateType>((state) => state.auth.user.role);

  const onLoad = () => {
    setLoad(true);
  };
  const styleIframe = {
    opacity: load ? 1 : 0,
  };
  return (
    <div className={styles.video}>
      <iframe
        src={props.video.link}
        title='YouTube video player'
        onLoad={onLoad}
        style={styleIframe}
      ></iframe>

      {!load && (
        <CircularProgress
          color='inherit'
          sx={{ zIndex: 10, position: "absolute" }}
        />
      )}

      {load ? (
        (role === "ADMIN" || role === "TEST") && (
          <div className={styles.settingsBtn}>
            <SettingsIcon
              onClick={() => {
                if (menuOpen) setMenuOpen(false);
                else setMenuOpen(true);
              }}
            />
            {menuOpen && (
              <VideoMenu video={props.video} setMenuOpen={setMenuOpen} />
            )}
          </div>
        )
      ) : (
        <div></div>
      )}
    </div>
  );
});

export default Video;
