import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { videosApi } from "../../api/videos-api";
import { AppRootStateType } from "../../store/store";
import { addVideoTC, setVideosTC } from "../../store/videos-reducer";
import Button from "../Custom-components/Buttons/Button";
import CustomTextField from "../Custom-components/TextField/TextField";
import Video from "./components/Video/Video";
import styles from "./styles.module.scss";

const Videos = () => {
  const dispatch = useDispatch();
  const [videoUrl, setVideoUrl] = useState("");
  const [showInput, setShowInput] = useState(false);
  const role = useSelector<AppRootStateType>((state) => state.auth.user.role);
  const videos = useSelector<AppRootStateType>(
    (state) => state.videos.videos
  ) as any;
  useEffect(() => {
    const thunk = setVideosTC();
    thunk(dispatch);
  }, []);
  return (
    <div className={styles.videos}>
      <h1>Відео</h1>
      {(role === "ADMIN" || role === "TEST") && (
        <div className={styles.addVideoBtn}>
          {showInput && (
            <CustomTextField
              label='Video url'
              variant='outlined'
              size='small'
              name='video'
              onChange={(e: any) => setVideoUrl(e.target.value)}
              value={videoUrl}
              autoFocus={true}
            />
          )}
          {!showInput ? (
            <Button
              title='Додати відео'
              onClick={async () => {
                setShowInput(true);
              }}
            />
          ) : (
            <div className={styles.buttons}>
              <Button
                title='Додати'
                onClick={async () => {
                  const thunk = addVideoTC(videoUrl);
                  thunk(dispatch);
                  setVideoUrl("");
                  setShowInput(false);
                }}
              />
              <Button
                title='Назад'
                onClick={async () => {
                  setVideoUrl("");
                  setShowInput(false);
                }}
              />
            </div>
          )}
        </div>
      )}
      <div className={styles.flexContainer}>
        {videos.length > 0 &&
          videos.map((video: any) => <Video video={video} />)}
      </div>
    </div>
  );
};

export default Videos;
