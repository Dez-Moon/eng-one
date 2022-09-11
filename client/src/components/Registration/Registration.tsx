import React, { useState } from "react";
import Button from "../Custom-components/Buttons/Button";
import "./styles.scss";
import { CSSTransition } from "react-transition-group";
import { Backdrop, CircularProgress } from "@mui/material";
import { ShowModalWindowType } from "../../App";
import CustomTextField from "../Custom-components/TextField/TextField";
import { Formik } from "formik";
import { registrationTC } from "../../store/auth-reducer";
import { useDispatch, useSelector } from "react-redux";
import { AppRootStateType } from "../../store/store";
import ErrorHandler from "../ErrorHandler/ErrorHandler";

type PropsType = {
  showModalWindow: ShowModalWindowType;
};
const Autorization = React.memo((props: PropsType) => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const loadingWindow = useSelector<AppRootStateType>(
    (state) => state.app.loadingWindow
  );
  const error = useSelector<AppRootStateType>(
    (state) => state.app.error
  ) as string;
  return (
    <CSSTransition
      in={props.showModalWindow === "registration"}
      unmountOnExit
      timeout={200}
      classNames={"registration"}
    >
      <div className={"registration"}>
        {loadingWindow === "registration" && (
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
        <span>Реєстрація</span>
        <Formik
          initialValues={{ email: "", password: "" }}
          validate={(values) => {}}
          onSubmit={(values) => {
            const thunk = registrationTC(values.email, values.password);
            thunk(dispatch);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            /* and other goodies */
          }) => (
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
              {/* <img
                  src={showPassword ? HidePasswordIMG : ShowPasswordIMG}
                  onClick={() => {
                    if (showPassword) setShowPassword(false);
                    else setShowPassword(true);
                  }}
                /> */}
              <Button
                title='Зареєструватися'
                type={"submit"}
                onClick={() => {}}
              ></Button>
            </form>
          )}
        </Formik>
      </div>
    </CSSTransition>
  );
});

export default Autorization;
