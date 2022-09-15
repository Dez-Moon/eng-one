import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import roles from "../../../../roles for administrator rights/roles";
import { AuthInitialStateType } from "../../../../store/auth-reducer";
import { AppRootStateType } from "../../../../store/store";
import styles from "./styles.module.scss";
import SettingsIcon from "@mui/icons-material/Settings";
import Button from "../../../Custom-components/Buttons/Button";
import { getColorTestResults } from "../../../../functions/functions";
import InfoAboutPassingTest from "./InfoAboutPassingTest";
import { TestsOnMainPageType } from "../TestsMain/TestsMain";

type PropsType = {
  index: number;
  test: TestsOnMainPageType;
};
export type UserPassedTheTestType = {
  id: string;
  countAttempts: number;
  bestResult: number;
};
const Test = React.memo((props: PropsType) => {
  const { user } = useSelector<AppRootStateType, AuthInitialStateType>(
    (state) => state.auth
  );
  const [userPassedTheTest, setUserPassedTheTest] =
    useState<UserPassedTheTestType | null>(null);
  const { index, test } = props;

  useEffect(() => {
    test.passedTest.forEach((userTest: UserPassedTheTestType) => {
      if (userTest?.id === user.id) {
        setUserPassedTheTest(userTest);
      } else setUserPassedTheTest(null);
    });
  }, [user]);
  return (
    <div className={styles.test} key={index}>
      {roles.has(user.role) && (
        <div className={styles.editTestIcon}>
          <div>
            <SettingsIcon
              onClick={() => {
                debugger;
              }}
            />
          </div>
        </div>
      )}
      <div>{test.name}</div>
      <div className={styles.passTestBtn}>
        <Button title='Пройти тест' onClick={() => {}} />
      </div>
      {userPassedTheTest && (
        <InfoAboutPassingTest
          userPassedTheTest={userPassedTheTest}
          test={test}
        />
      )}
    </div>
  );
});

export default Test;
