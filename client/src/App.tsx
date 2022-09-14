import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useLocation } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "./App.scss";
import AboutMe from "./components/AboutMe/AboutMe";
import Autorization from "./components/Autorization/Autorization";
import Contacts from "./components/Contacts/Contacts";
import Button from "./components/Custom-components/Buttons/Button";
import NavigationOverlay from "./components/Header/components/NavigationOverlay";
import Header from "./components/Header/Header";
import LevelDetection from "./components/LevelDetection/LevelDetection";
import Main from "./components/Main/Main";
import Registration from "./components/Registration/Registration";
import UserInfo from "./components/UserInfo/UserInfo";
import Tests from "./components/Tests/Tests";
import UserInfoOverlay from "./components/UserInfoOverlay/UserInfoOverlay";
import { chechAuthTC, logoutTC } from "./store/auth-reducer";
import { AppRootStateType } from "./store/store";
import AdminPanel from "./components/AdminPanel/AdminPanel";
import { useBeforeunload } from "react-beforeunload";
import { authApi } from "./api/auth-api";
import Videos from "./components/Videos/Videos";
import { Backdrop } from "@mui/material";
import Chat from "./components/Chat/Chat";
import { AppInitialStateType, isInitializedTC } from "./store/app-reducer";
import Preloader from "./Preloader/Preloader";

export type ShowModalWindowType =
  | "autorization"
  | "registration"
  | "navigation"
  | "userInfo"
  | null;
const array = [
  { link: "/", name: "Головна" },
  { link: "/about-me", name: "Про мене" },
  { link: "/videos", name: "Відео" },
  { link: "/level-detection", name: "Визначення рівня" },
  { link: "/tests", name: "Тести" },
  { link: "/contacts", name: "Контакти" },
];

const App = () => {
  const socket = new WebSocket(process.env.REACT_APP_WEBSOCKET as any);
  useBeforeunload((event) => {
    authApi.userOffline();
    socket.send(JSON.stringify({ method: "disconect", userId: auth.user.id }));
    socket.close();
  });
  const dispatch = useDispatch();
  const auth = useSelector<AppRootStateType>((state) => state.auth) as any;
  const [showModalWindow, setShowModalWindow] = useState(null) as any;
  const location = useLocation();
  const { isInitialized } = useSelector<AppRootStateType, AppInitialStateType>(
    (state) => state.app
  );
  const screenWidth = window.screen.width;
  const screenHeight = window.screen.height;
  const style = {
    height: screenWidth < 500 ? screenHeight : "100vh",
  };
  useEffect(() => {
    isInitializedTC()(dispatch);
  }, []);
  useEffect(() => {
    socket.onopen = () => {
      socket.send(
        JSON.stringify({ method: "conect", userId: auth.user.id || "гость" })
      );
      socket.onclose = () => {
        socket.send(
          JSON.stringify({ method: "disconect", userId: auth.user.id })
        );
      };
    };
  }, []);
  useEffect(() => {
    if (auth.isAuth) {
      setShowModalWindow(null);
    }
  }, [auth.isAuth]);

  if (!isInitialized) {
    return <Preloader />;
  }

  return (
    <div className='App' style={style}>
      <div className='Header'>
        <Header
          setShowModalWindow={setShowModalWindow}
          navigation={array}
          showModalWindow={showModalWindow}
        />
        <NavigationOverlay
          navigation={array}
          setShowModalWindow={setShowModalWindow}
          showModalWindow={showModalWindow}
        />
        {!auth.isAuth ? (
          <div>
            <Autorization showModalWindow={showModalWindow} />
            <Registration showModalWindow={showModalWindow} />
            <div className='header-buttons'>
              <Button
                title='Авторизація'
                onClick={() => {
                  if (showModalWindow !== "autorization")
                    setShowModalWindow("autorization");
                  else setShowModalWindow(null);
                }}
              ></Button>
              <Button
                title='Реєстрація'
                onClick={() => {
                  if (showModalWindow !== "registration")
                    setShowModalWindow("registration");
                  else setShowModalWindow(null);
                }}
              ></Button>
            </div>
          </div>
        ) : (
          <div className='header-buttons'>
            <div className='user-email'>
              <span
                onClick={() => {
                  if (showModalWindow === "userInfo") setShowModalWindow(null);
                  else setShowModalWindow("userInfo");
                }}
              >
                {auth.user.email}
              </span>
            </div>
            <UserInfoOverlay
              user={auth.user}
              showModalWindow={showModalWindow}
              setShowModalWindow={setShowModalWindow}
            />
            <Button
              title='Вихід'
              onClick={() => {
                const thunk = logoutTC();
                thunk(dispatch);
              }}
            ></Button>
          </div>
        )}
      </div>
      <div className='Main'>
        <TransitionGroup component={null}>
          <CSSTransition key={location.key} classNames='fade' timeout={500}>
            <Routes location={location}>
              <Route
                path='/'
                element={<Main setShowModalWindow={setShowModalWindow} />}
              />
              <Route path='/about-me' element={<AboutMe />} />
              <Route path='/videos' element={<Videos />} />
              <Route path='/level-detection' element={<LevelDetection />} />
              <Route path='/tests' element={<Tests />} />
              <Route path='/contacts' element={<Contacts />} />
              <Route
                path='/user-info'
                element={<UserInfo user={auth.user} />}
              />
              <Route path='/admin' element={<AdminPanel />} />
            </Routes>
          </CSSTransition>
        </TransitionGroup>
      </div>
      <Chat />
      {showModalWindow && (
        <Backdrop sx={{ color: "#fff", zIndex: 0 }} open={true}></Backdrop>
      )}
    </div>
  );
};

export default App;
