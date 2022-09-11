import React from "react";
import styles from "./styles.module.scss";

type PropsType = {
  title: string;
  onClick: any;
  disabled?: boolean;
  type?: "button" | "submit" | "reset" | undefined;
};
const Button = React.memo((props: PropsType) => {
  const style = props.disabled
    ? styles.Button + " " + styles.disabled
    : styles.Button;
  return (
    <div className={style}>
      <button
        onClick={props.onClick}
        type={props.type}
        disabled={props.disabled}
      >
        {props.title}
      </button>
    </div>
  );
});

export default Button;
