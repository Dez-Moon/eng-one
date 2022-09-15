import React, { useEffect } from "react";
import { Link, Location, useLocation } from "react-router-dom";
import styles from "./styles.module.scss";
import MenuIcon from "@mui/icons-material/Menu";
import { ShowModalWindowType } from "../../App";
import { useDispatch } from "react-redux";

type PropsType = {
  setShowModalWindow: any;
  navigation: any;
  showModalWindow: ShowModalWindowType;
};
const Header = React.memo((props: PropsType) => {
  const location: Location = useLocation();
  const screenWidth = window.screen.width;

  return (
    <div
      className={styles.header}
      onClick={() => {
        if (props.showModalWindow) {
          props.setShowModalWindow(null);
        }
      }}
    >
      {screenWidth > 880 ? (
        <div className={styles.navigation}>
          {props.navigation.map((el: any) => {
            if (location.pathname !== el.link) {
              return (
                <Link to={el.link} className={styles.navItem}>
                  <div>{el.name}</div>
                </Link>
              );
            } else {
              return (
                <div className={styles.navItem + " " + styles.active}>
                  {el.name}
                </div>
              );
            }
          })}
        </div>
      ) : (
        <div
          className={styles.navigation}
          onClick={() => {
            if (props.showModalWindow === "navigation") {
              props.setShowModalWindow(null);
            } else {
              props.setShowModalWindow("navigation");
            }
          }}
        >
          <MenuIcon sx={{ fontSize: "40px" }} />
        </div>
      )}
    </div>
  );
});

export default Header;
