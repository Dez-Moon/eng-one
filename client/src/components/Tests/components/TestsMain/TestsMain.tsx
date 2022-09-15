import React, { useEffect, useState } from "react";
import { testsApi } from "../../../../api/tests-api";
import Button from "../../../Custom-components/Buttons/Button";
import { ShowTestContentType } from "../../Tests";
import Test, { UserPassedTheTestType } from "../Test/Test";
import styles from "./styles.module.scss";

export type TestsOnMainPageType = {
  id: string;
  name: string;
  countQuestions: number;
  passedTest: Array<UserPassedTheTestType>;
};
type PropsType = {
  setShowContent: React.Dispatch<React.SetStateAction<ShowTestContentType>>;
};
const TestsMain = (props: PropsType) => {
  const [tests, setTests] = useState<Array<TestsOnMainPageType>>();
  useEffect(() => {
    testsApi.getTests().then((response) => {
      setTests(response.data);
    });
  }, []);
  // event functions
  const createTest = () => {
    const a: any = {
      name: "Новий тест",
      questions: [],
      countQuestions: 0,
      passedTest: [],
    };
    props.setShowContent({ type: "test-creation" });
  };
  return (
    <div className={styles.mainTestsPage}>
      <h1>Тести</h1>
      <div className={styles.testContainer}>
        {tests?.map((test: any, index: number) => (
          <Test index={index} test={test} />
        ))}
      </div>
      <div className={styles.createTestBtn}>
        <Button title='Створити новий тест' onClick={createTest} />
      </div>
    </div>
  );
};

export default TestsMain;
