import React, { useState } from "react";
import { authApi } from "../../api/auth-api";
import { IUser } from "../../models/IUser";
import styles from "./styles.module.scss";
import UserIcon from "../../assets/user-icon.png";
import Button from "../Custom-components/Buttons/Button";
import { useSelector } from "react-redux";
import { AppRootStateType } from "../../store/store";
import { Navigate } from "react-router-dom";
import { getTimeLastOnline } from "../../functions/getTimeLastOnline";
import User from "./components/User/User";
import UsersShown from "./components/UsersShown/UsersShown";

const AdminPanel = () => {
  const [users, setUsers] = useState(null) as any;
  const user = useSelector<AppRootStateType>(
    (state) => state.auth.user
  ) as IUser;
  const [filter, setFilter] = useState("all") as any;

  if (user?.role === "ADMIN" || user?.role === "TEST") {
    return (
      <div className={styles.adminPanel}>
        <h1>Панель адміністратора</h1>
        {!users ? (
          <Button
            title='Показати усіх користувачів'
            onClick={async () => {
              const response = await authApi.getUsers();
              setUsers(response.data);
            }}
          />
        ) : (
          <UsersShown
            setUsers={setUsers}
            filter={filter}
            setFilter={setFilter}
          />
        )}
        {users && (
          <div className={styles.users}>
            {filter !== "all"
              ? users
                  .filter((user: IUser) => user.status === filter)
                  .map((user: IUser, index: number) => {
                    return <User user={user} index={index} />;
                  })
              : users.map((user: IUser, index: number) => {
                  return <User user={user} index={index} />;
                })}
          </div>
        )}
      </div>
    );
  } else return <Navigate to='/' />;
};

export default AdminPanel;
