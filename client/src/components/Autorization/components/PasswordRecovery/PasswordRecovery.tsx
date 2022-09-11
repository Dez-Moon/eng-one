import { Formik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import { authApi } from "../../../../api/auth-api";
import { setErrorAC, setLoadingWindowAC } from "../../../../store/app-reducer";
import Button from "../../../Custom-components/Buttons/Button";
import CustomTextField from "../../../Custom-components/TextField/TextField";
import ReplyIcon from "@mui/icons-material/Reply";
import { AxiosError } from "axios";

type PropsType = {
  forgotPassword: "email" | "code" | "password" | null;
  setForgotPassword: any;
};
const PasswordRecovery = React.memo((props: PropsType) => {
  const dispatch = useDispatch();
  return (
    <div>
      <ReplyIcon
        sx={{
          position: "absolute",
          top: "5px",
          left: "5px",
          fontSize: "20px",
          cursor: "pointer",
        }}
        onClick={() => {
          props.setForgotPassword(null);
        }}
      />
      {(props.forgotPassword === "email" && (
        <Formik
          initialValues={{ email: "" }}
          onSubmit={async (values) => {
            dispatch(setLoadingWindowAC({ window: "autorization" }));
            try {
              const response = await authApi.getPasswordRecoveryCode(
                values.email
              );
              props.setForgotPassword("code");
            } catch (e: any) {
              dispatch(setErrorAC({ error: e.response.data.message }));
              debugger;
            }
            dispatch(setLoadingWindowAC({ window: null }));
          }}
        >
          {({ values, handleChange, handleBlur, handleSubmit }) => {
            return (
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
                <Button
                  title='Надіслати код'
                  type={"submit"}
                  onClick={() => {}}
                ></Button>
              </form>
            );
          }}
        </Formik>
      )) ||
        (props.forgotPassword === "code" && (
          <Formik
            initialValues={{ code: "" }}
            onSubmit={async (values) => {
              dispatch(setLoadingWindowAC({ window: "autorization" }));
              try {
                const response = await authApi.checkPasswordRecoveryCode(
                  values.code
                );
                props.setForgotPassword("password");
              } catch (e: any) {
                dispatch(setErrorAC({ error: e.response.data.message }));
              }
              dispatch(setLoadingWindowAC({ window: null }));
            }}
          >
            {({ values, handleChange, handleBlur, handleSubmit }) => {
              return (
                <form onSubmit={handleSubmit} className='form'>
                  <CustomTextField
                    label='Код'
                    variant='outlined'
                    size='small'
                    name='code'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.code || ""}
                  />
                  <Button
                    title='Змінити пароль'
                    type={"submit"}
                    onClick={() => {}}
                  ></Button>
                </form>
              );
            }}
          </Formik>
        )) ||
        (props.forgotPassword === "password" && (
          <Formik
            initialValues={{
              password: "",
              email: "",
              passwordRepeat: "",
            }}
            onSubmit={async (values) => {
              if (values.password === values.passwordRepeat) {
                dispatch(setLoadingWindowAC({ window: "autorization" }));
                try {
                  const response = authApi.setPassword(
                    values.email,
                    values.password
                  );
                  props.setForgotPassword(null);
                } catch (e) {
                  console.log(e);
                }
                dispatch(setLoadingWindowAC({ window: null }));
              } else {
                dispatch(setErrorAC({ error: "Паролі не співпадають " }));
              }
            }}
          >
            {({ values, handleChange, handleBlur, handleSubmit }) => {
              return (
                <form onSubmit={handleSubmit} className='form'>
                  <CustomTextField
                    label='Пароль'
                    variant='outlined'
                    size='small'
                    name='password'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password || ""}
                  />
                  <CustomTextField
                    label='Повторіть пароль'
                    variant='outlined'
                    size='small'
                    name='passwordRepeat'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.passwordRepeat || ""}
                  />
                  <Button
                    title='Зберігти'
                    type={"submit"}
                    onClick={() => {}}
                  ></Button>
                </form>
              );
            }}
          </Formik>
        ))}
    </div>
  );
});

export default PasswordRecovery;
