import React from "react";
import { CSSTransition } from "react-transition-group";
import ReplyIcon from "@mui/icons-material/Reply";
import "../../styles.scss";

type PropsType = {
  openWindow: any;
  setOpenWindow: any;
};
const Grammar = React.memo((props: PropsType) => {
  return (
    <CSSTransition
      in={props.openWindow === "grammar"}
      unmountOnExit
      timeout={200}
      classNames={"selectedElement"}
    >
      <div className='selectedElement'>
        <ReplyIcon
          sx={{
            position: "absolute",
            top: "5px",
            left: "5px",
            fontSize: "30px",
            cursor: "pointer",
          }}
          onClick={() => {
            props.setOpenWindow("all");
          }}
        />
        Grammar
      </div>
    </CSSTransition>
  );
});

export default Grammar;
