import React from "react";
import { CSSTransition } from "react-transition-group";
import ReplyIcon from "@mui/icons-material/Reply";
import "../../styles.scss";

type PropsType = {
  openWindow: any;
  setOpenWindow: any;
};
const Speakiny = React.memo((props: PropsType) => {
  return (
    <CSSTransition
      in={props.openWindow === "speakiny"}
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
        Speakiny
      </div>
    </CSSTransition>
  );
});

export default Speakiny;
