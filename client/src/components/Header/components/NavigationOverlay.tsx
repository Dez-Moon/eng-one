import React from "react";
import { Link } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import { ShowModalWindowType } from "../../../App";
import "./styles.scss";

type PropsType = {
  navigation: any;
  setShowModalWindow: any;
  showModalWindow: ShowModalWindowType;
};
const NavigationOverlay = React.memo((props: PropsType) => {
  return (
    <CSSTransition
      in={props.showModalWindow === "navigation"}
      unmountOnExit
      timeout={200}
      classNames={"navigationOverlay"}
    >
      <div className='navigationOverlay'>
        {props.navigation.map((el: any) => (
          <Link
            to={el.link}
            className='navItem'
            onClick={() => {
              props.setShowModalWindow(null);
            }}
            key={el}
          >
            <div>{el.name}</div>
          </Link>
        ))}
      </div>
    </CSSTransition>
  );
});

export default NavigationOverlay;
