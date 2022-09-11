import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import styles from "./styles.module.scss";
import User from "../../assets/user-icon.png";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { authApi } from "../../api/auth-api";
import { useDispatch, useSelector } from "react-redux";
import { chechAuthTC, uploadUserPhotoTC } from "../../store/auth-reducer";
import { Backdrop, CircularProgress } from "@mui/material";
import { AppRootStateType } from "../../store/store";

type PropsType = {
  user: any;
};
const UserInfo = React.memo((props: PropsType) => {
  const dispatch = useDispatch();
  const appStatus = useSelector<AppRootStateType>((state) => state.app.status);
  if (!props.user.id) {
    return <Navigate to='/' />;
  }
  return (
    <div className={styles.settings}>
      {appStatus === "loading" && (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={true}
        >
          <CircularProgress color='inherit' />
        </Backdrop>
      )}
      <h1>Інформація користувача</h1>
      <div className={styles.userInfo}>
        <div className={styles.photo}>
          <img src={props.user.img || User} />
          <label className={styles.addImage}>
            <AddAPhotoIcon className={styles.addImageIcon} />
            <input
              type='file'
              accept='image/*,image/jpeg'
              onChange={async (e: any) => {
                const thunk = uploadUserPhotoTC(e.target.files[0]);
                thunk(dispatch);
              }}
            />
          </label>
        </div>
        <div>{props.user.email}</div>
      </div>
      <div className={styles.info}>
        <div className={styles.item}>
          <h1>Рівень англійської</h1>
          <div>Невизначений</div>
        </div>
        <div className={styles.item}>
          <h1>Пройдені матеріали</h1>
          <div>Немає пройдених матеріалів</div>
        </div>
      </div>
    </div>
  );
});

export default UserInfo;
