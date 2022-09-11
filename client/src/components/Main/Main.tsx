import React, { useState } from "react";
import "./styles.scss";
import ReplyIcon from "@mui/icons-material/Reply";
import { CSSTransition } from "react-transition-group";
import Grammar from "./components/Grammar/Grammar";
import Vocabulary from "./components/Vocabulary/Vocabulary";
import Speakiny from "./components/Speakiny/Speakiny";
import Listening from "./components/Listening/Listening";

type PropsType = {
  setShowModalWindow: any;
};
const Main = React.memo((props: PropsType) => {
  const array = ["Grammar", "Vocabulary", "Speaking", "Listening"];
  const [openWindow, setOpenWindow] = useState("all") as any;
  return (
    <div className={"main"} onClick={() => props.setShowModalWindow(null)}>
      {openWindow === "all" &&
        array.map((el) => (
          <div
            className={"mainElements"}
            onClick={() => {
              setOpenWindow(el.toLowerCase());
            }}
          >
            {el}
          </div>
        ))}
      <Grammar openWindow={openWindow} setOpenWindow={setOpenWindow} />
      <Vocabulary openWindow={openWindow} setOpenWindow={setOpenWindow} />
      <Speakiny openWindow={openWindow} setOpenWindow={setOpenWindow} />
      <Listening openWindow={openWindow} setOpenWindow={setOpenWindow} />
      {openWindow === "vocabulary" && (
        <div className={"selectedElement"}>
          <ReplyIcon
            sx={{
              position: "absolute",
              top: "5px",
              left: "5px",
              fontSize: "30px",
              cursor: "pointer",
            }}
            onClick={() => {
              setOpenWindow("all");
            }}
          />
          Grammar
        </div>
      )}
      {openWindow === "speakiny" && (
        <div className={"selectedElement"}>
          <ReplyIcon
            sx={{
              position: "absolute",
              top: "5px",
              left: "5px",
              fontSize: "30px",
              cursor: "pointer",
            }}
            onClick={() => {
              setOpenWindow("all");
            }}
          />
          Grammar
        </div>
      )}
      {openWindow === "listening" && (
        <div className={"selectedElement"}>
          <ReplyIcon
            sx={{
              position: "absolute",
              top: "5px",
              left: "5px",
              fontSize: "30px",
              cursor: "pointer",
            }}
            onClick={() => {
              setOpenWindow("all");
            }}
          />
          Grammar
        </div>
      )}
    </div>
  );
});

export default Main;
