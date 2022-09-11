import React from "react";
import { useDispatch } from "react-redux";
import { setErrorAC } from "../../store/app-reducer";
import Button from "../Custom-components/Buttons/Button";
import styles from "./styles.module.scss";

type PropsType = {
  error: string;
};
const ErrorHandler = React.memo((props: PropsType) => {
  const dispatch = useDispatch();
  return (
    <div className={styles.errorHandler}>
      <div className={styles.error}>
        <div>{props.error}</div>
        <Button
          title='Ок'
          onClick={() => dispatch(setErrorAC({ error: null }))}
        />
      </div>
    </div>
  );
});

export default ErrorHandler;
