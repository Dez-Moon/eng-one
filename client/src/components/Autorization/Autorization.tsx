import React, { useState } from "react";
import Button from "../Custom-components/Buttons/Button";
import "./styles.scss";
import { CSSTransition } from "react-transition-group";
import ShowPasswordIMG from "../../assets/icons/show-password.png";
import HidePasswordIMG from "../../assets/icons/hide-password.png";
import {
  Backdrop,
  Checkbox,
  CircularProgress,
  FormControlLabel,
} from "@mui/material";
import { ShowModalWindowType } from "../../App";
import CustomTextField from "../Custom-components/TextField/TextField";
import { Formik } from "formik";
import { loginTC } from "../../store/auth-reducer";
import { useDispatch, useSelector } from "react-redux";
import { AppRootStateType } from "../../store/store";
import ErrorHandler from "../ErrorHandler/ErrorHandler";
import PasswordRecovery from "./components/PasswordRecovery/PasswordRecovery";

type PropsType = {
  showModalWindow: ShowModalWindowType;
};
const Autorization = React.memo((props: PropsType) => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(null) as any;
  const loadingWindow = useSelector<AppRootStateType>(
    (state) => state.app.loadingWindow
  );
  const error = useSelector<AppRootStateType>(
    (state) => state.app.error
  ) as any;
  return (
    <CSSTransition
      in={props.showModalWindow === "autorization"}
      unmountOnExit
      timeout={200}
      classNames={"autorization"}
    >
      <div className={"autorization"}>
        {forgotPassword ? (
          <div className='forgotPassword'>
            <span>Забув пароль</span>
            <PasswordRecovery
              forgotPassword={forgotPassword}
              setForgotPassword={setForgotPassword}
            />
          </div>
        ) : (
          <div>
            <span>Вхід</span>
            <Formik
              initialValues={{ email: "", password: "", rememberMe: false }}
              validate={(values) => {}}
              onSubmit={(values) => {
                const thunk = loginTC(values);
                thunk(dispatch);
              }}
            >
              {({ values, handleChange, handleBlur, handleSubmit }) => (
                <form onSubmit={handleSubmit} className={"form"}>
                  <CustomTextField
                    label='Email'
                    variant='outlined'
                    size='small'
                    name='email'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                  />
                  <div className={"password"}>
                    <CustomTextField
                      label='Password'
                      variant='outlined'
                      size='small'
                      name='password'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                      type={showPassword ? "text" : "password"}
                    />
                    <img
                      src={showPassword ? HidePasswordIMG : ShowPasswordIMG}
                      onClick={() => {
                        if (showPassword) setShowPassword(false);
                        else setShowPassword(true);
                      }}
                    />
                  </div>
                  <FormControlLabel
                    style={{ marginRight: "3px" }}
                    control={
                      <Checkbox
                        sx={{
                          "& .MuiSvgIcon-root": {
                            fontSize: 16,
                            color: "white",
                          },
                        }}
                      />
                    }
                    label="Запам'ятати мене"
                    name='rememberMe'
                    onChange={handleChange}
                  />
                  <div className='button'>
                    <Button
                      title='Увійти'
                      type={"submit"}
                      onClick={() => {}}
                    ></Button>
                    <span onClick={() => setForgotPassword("email")}>
                      Забув пароль
                    </span>
                  </div>
                </form>
              )}
            </Formik>
          </div>
        )}
        {loadingWindow === "autorization" && (
          <div className={"preloader"}>
            <Backdrop
              sx={{
                color: "#fff",
                borderRadius: "0.5rem",
                zIndex: (theme) => theme.zIndex.drawer + 1,
              }}
              open={true}
            />
            <CircularProgress color='inherit' />
          </div>
        )}
        {error && <ErrorHandler error={error} />}
      </div>
    </CSSTransition>
  );
});

export default Autorization;
