import React, { useState } from "react";
import "./styles.scss";
import User from "../../assets/user-icon.png";
import Button from "../Custom-components/Buttons/Button";
import { NavLink } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import { CircularProgress } from "@mui/material";
import { ShowModalWindowType } from "../../App";

type PropsType = {
  user: any;
  showModalWindow: ShowModalWindowType;
  setShowModalWindow: any;
};
const UserInfoOverlay = React.memo((props: PropsType) => {
  const [load, setLoad] = useState(false);
  const onLoad = () => {
    setLoad(true);
  };

  return (
    <CSSTransition
      in={props.showModalWindow === "userInfo"}
      unmountOnExit
      timeout={200}
      classNames={"userInfoOverlay"}
    >
      <div className={"userInfoOverlay"}>
        <div className={"userInfo"}>
          <img src={props.user.img || User} onLoad={onLoad}></img>
          {!load && (
            <div className={"preloader"}>
              <CircularProgress size='16px' />
            </div>
          )}
          <div>{props.user.email}</div>
        </div>
        <NavLink to='/user-info'>
          <Button
            title='Інформація користувача'
            onClick={() => {
              props.setShowModalWindow(null);
            }}
          />
        </NavLink>
        {(props.user.role === "ADMIN" || props.user.role === "TEST") && (
          <NavLink to='/admin'>
            <Button
              title='Панель адміністратора'
              onClick={() => {
                props.setShowModalWindow(null);
              }}
            />
          </NavLink>
        )}
      </div>
    </CSSTransition>
  );
});

export default UserInfoOverlay;
