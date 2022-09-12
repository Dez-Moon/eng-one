import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppRootStateType } from "../../store/store";
import {
  createTestAC,
  setPassingTestAC,
  setTestsTC,
} from "../../store/tests-reducer";
import Button from "../Custom-components/Buttons/Button";
import TestCreation from "./components/TestСreation/TestCreation";
import SettingsIcon from "@mui/icons-material/Settings";
import styles from "./styles.module.scss";
import PassingTest from "./components/PassingTest/PassingTest";
import TestResult from "./components/TestResult/TestResult";
import roles from "../../roles for administrator rights/roles";

const Tests = React.memo(() => {
  const dispatch = useDispatch();
  const screenWidth = window.screen.width;

  const [creatingTest, setCreatingTest] = useState(false);
  const tests = useSelector<AppRootStateType>(
    (state) => state.tests.tests
  ) as any;
  const user = useSelector<AppRootStateType>((state) => state.auth.user) as any;
  const role = useSelector<AppRootStateType>(
    (state) => state.auth.user.role
  ) as any;
  const passingTest = useSelector<AppRootStateType>(
    (state) => state.tests.passingTest
  ) as any;
  const [testIndex, setTestIndex] = useState(tests.length - 1);
  useEffect(() => {
    const thunk = setTestsTC();
    thunk(dispatch);
  }, []);
  return (
    <div className={styles.tests}>
      {!creatingTest ? (
        passingTest === null ? (
          <div className={styles.content}>
            <div className={styles.testsContainer}>
              <span className={styles.header}>Тести</span>
              {roles.has(role) && (
                <div className={styles.createTestBtn}>
                  <Button
                    title='Створити новий тест'
                    onClick={() => {
                      let testsCopy = [...tests];
                      testsCopy.push({ name: "Новий тест", questions: [] });
                      dispatch(createTestAC());
                      setTestIndex(tests.lenght > 0 ? tests.length - 1 : 0);
                      setCreatingTest(true);
                    }}
                  />
                </div>
              )}
              {tests.length > 0 &&
                tests.map((test: any, index: number) => {
                  let userPassedTheTest = false as any;
                  test.passedTest.forEach((userTest: any) => {
                    if (userTest.id === user.id) {
                      userPassedTheTest = userTest;
                    }
                  });
                  const getColor = () => {
                    if (
                      (userPassedTheTest.bestResult /
                        userPassedTheTest.countAttempts) *
                        100 >
                        0.3 &&
                      (userPassedTheTest.bestResult /
                        userPassedTheTest.countAttempts) *
                        100 <
                        0.5
                    ) {
                      return "orange";
                    }
                    if (
                      (userPassedTheTest.bestResult /
                        userPassedTheTest.countAttempts) *
                        100 >
                        0.5 &&
                      (userPassedTheTest.bestResult /
                        userPassedTheTest.countAttempts) *
                        100 <
                        0.7
                    ) {
                      return "yellow";
                    }
                    if (
                      (userPassedTheTest.bestResult /
                        userPassedTheTest.countAttempts) *
                        100 >
                        0.7 &&
                      (userPassedTheTest.bestResult /
                        userPassedTheTest.countAttempts) *
                        100 <
                        0.9
                    ) {
                      return "#7fff00";
                    }
                    if (
                      (userPassedTheTest.bestResult /
                        userPassedTheTest.countAttempts) *
                        100 >
                      0.9
                    ) {
                      return "green";
                    } else {
                      return "red";
                    }
                  };
                  const colorStyle = {
                    color: getColor(),
                  };
                  return (
                    <div className={styles.testName} key={index}>
                      {roles.has(role) && (
                        <div>
                          <SettingsIcon
                            className={styles.editTestIcon}
                            onClick={() => {
                              setTestIndex(index);
                              setCreatingTest(true);
                            }}
                          />
                        </div>
                      )}
                      <div>{test.name}</div>

                      <Button
                        title='Пройти тест'
                        onClick={() => {
                          dispatch(
                            setPassingTestAC({
                              test: tests[index],
                              index: index,
                            })
                          );
                        }}
                      />
                      {(screenWidth > 786 && userPassedTheTest && (
                        <div className={styles.result}>
                          <div>
                            Спроб:{" "}
                            <span>{userPassedTheTest.countAttempts}</span>
                          </div>
                          <div>
                            Кращий результат:{" "}
                            <span style={colorStyle}>
                              {userPassedTheTest.bestResult}/
                              {test.countQuestions}
                            </span>
                          </div>
                        </div>
                      )) ||
                        (screenWidth < 786 && userPassedTheTest && (
                          <div>info</div>
                        ))}
                    </div>
                  );
                })}
            </div>
          </div>
        ) : !passingTest.testFinished ? (
          <PassingTest />
        ) : (
          <TestResult />
        )
      ) : (
        <TestCreation
          tests={tests}
          test={tests[testIndex]}
          index={testIndex}
          setCreatingTest={setCreatingTest}
          setTestIndex={setTestIndex}
        />
      )}
    </div>
  );
});

export default Tests;
