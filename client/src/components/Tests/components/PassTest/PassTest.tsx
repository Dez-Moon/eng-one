import { Checkbox, CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { testsApi } from "../../../../api/tests-api";
import Button from "../../../Custom-components/Buttons/Button";
import { CreatingAndPassingTestType } from "../TestСreation/TestCreation";
import PassTestQuestion from "./PassTestQuestion/PassTestQuestion";
import styles from "./styles.module.scss";

type PropsType = {
  testId: string;
};
const PassTest = React.memo((props: PropsType) => {
  const [test, setTest] = useState<CreatingAndPassingTestType>();
  const [indexQuestion, setIndexQuestion] = useState<number>(0);
  useEffect(() => {
    testsApi
      .getTestForPass(props.testId)
      .then((response) => setTest(response.data));
  }, []);

  // const getResult = () => {
  //   let correctAnswers = 0;
  //   test.questions.forEach((question: any, indexQuestions: number) => {
  //     question.answerVariants.forEach((variant: any, index: number) => {
  //       if (
  //         variant.answerCorrect &&
  //         variant.answerCorrect ===
  //           tests[test.index].questions[indexQuestions].answerVariants[
  //             index
  //           ].answerCorrect
  //       ) {
  //         correctAnswers++;
  //       }
  //     });
  //   });
  // };
  const getPrevQuestion = () => {
    setIndexQuestion(indexQuestion - 1);
  };
  const getNextQuestion = () => {
    setIndexQuestion(indexQuestion + 1);
  };
  if (!test) return <div></div>;
  return (
    <div className={styles.test}>
      <div className={styles.testName}>{test?.name}</div>
      <div>
        <PassTestQuestion
          test={test}
          setTest={setTest}
          indexQuestion={indexQuestion}
        />
      </div>
      <div className={styles.buttons}>
        <Button
          title='Попереднє'
          disabled={indexQuestion < 1}
          onClick={getPrevQuestion}
        />
        {indexQuestion !== test.questions.length - 1 ? (
          <Button title='Наступне' onClick={getNextQuestion} />
        ) : (
          <Button title='Отримати результати' onClick={() => {}} />
        )}
      </div>
      <div className={styles.questionPaginator}>
        {test?.questions.map((question: any, index: number) => (
          <div
            className={indexQuestion === index ? styles.active : ""}
            onClick={() => {}}
            key={index}
          >
            {index + 1}
          </div>
        ))}
      </div>
    </div>
  );
});

export default PassTest;
