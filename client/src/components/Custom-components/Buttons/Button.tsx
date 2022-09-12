import React from "react";
import styles from "./styles.module.scss";

type PropsType = {
  title: string;
  onClick: any;
  disabled?: boolean;
  style?: any;
  type?: "button" | "submit" | "reset" | undefined;
};
const Button = React.memo((props: PropsType) => {
  return (
    <button
      onClick={props.onClick}
      type={props.type}
      disabled={props.disabled}
      className={styles.Button}
      style={props.style}
    >
      {props.title}
    </button>
  );
});

export default Button;
