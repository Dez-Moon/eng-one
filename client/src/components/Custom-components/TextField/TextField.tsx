import styled from "@emotion/styled";
import { TextField } from "@mui/material";
import React from "react";
import "./styles.scss";

type PropsType = {
  autoFocus?: boolean;
  defaultValue?: any;
  disabled?: boolean;
  error?: boolean;
  fullWidth?: boolean;
  helperText?: string;
  id?: string;
  name?: string;
  onChange?: any;
  placeholder?: string;
  required?: boolean;
  size?: "medium" | "small";
  value?: any;
  label?: string;
  variant?: "filled" | "outlined" | "standard";
  type?: string;
  onBlur?: any;
  autoComplete?: string;
  ref?: any;
  onKeyPress?: any;
};

const CustomTextField = React.memo((props: PropsType) => {
  const style = {
    "& .MuiInputLabel-root": {
      marginTop: "3px",
      color: "white",
      fontSize: "12px",
      overflow: "visible",
    },

    "& .Mui-focused": {
      color: "white",
      "& input": {
        color: "white",
      },
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "white",
    },
    "& .MuiOutlinedInput-root": {
      color: "white",

      "& input": {
        color: "white",
      },
      "& fieldset": {
        border: "1px solid white",
      },
      "&:hover fieldset": {
        border: "1px solid white",
        color: "white",
      },
      "&.Mui-focused fieldset": {
        border: "2px solid white",
      },
    },
    "& .MuiFilledInput-underline:after": {
      borderBottomColor: "white",
    },
    "& .MuiFilledInput-root": {
      color: "white",

      "& input": {
        color: "white",
      },
      "& fieldset": {
        border: "1px solid white",
      },
      "&:hover fieldset": {
        border: "1px solid white",
        color: "white",
      },
      "&.Mui-focused fieldset": {
        border: "2px solid white",
      },
    },
  };
  return (
    <TextField
      sx={style}
      autoFocus={props.autoFocus}
      defaultValue={props.defaultValue}
      disabled={props.disabled}
      error={props.error}
      fullWidth={props.fullWidth}
      helperText={props.helperText}
      id={props.id}
      name={props.name}
      onChange={props.onChange}
      placeholder={props.placeholder}
      required={props.required}
      size={props.size}
      value={props.value}
      label={props.label}
      variant={props.variant}
      type={props.type}
      onBlur={props.onBlur}
      autoComplete={props.autoComplete}
      onKeyPress={props.onKeyPress}
    />
  );
});

export default CustomTextField;
