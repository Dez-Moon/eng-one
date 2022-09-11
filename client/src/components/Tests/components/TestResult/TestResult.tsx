import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { AppRootStateType } from "../../../../store/store";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import Button from "../../../Custom-components/Buttons/Button";
import {
  finishedTestTC,
  setPassingTestAC,
} from "../../../../store/tests-reducer";

const TestResult = () => {
  const dispatch = useDispatch();
  const passingTest = useSelector<AppRootStateType>(
    (state) => state.tests.passingTest
  ) as any;
  const tests = useSelector<AppRootStateType>(
    (state) => state.tests.tests
  ) as any;
  const [correctAnswers, setCorrectAnswers] = useState(0);
  useEffect(() => {
    let correctAnswers = 0;
    passingTest.questions.forEach((question: any, indexQuestions: number) => {
      question.answerVariants.forEach((variant: any, index: number) => {
        if (
          variant.answerCorrect &&
          variant.answerCorrect ===
            tests[passingTest.index].questions[indexQuestions].answerVariants[
              index
            ].answerCorrect
        ) {
          correctAnswers++;
        }
      });
    });
    setCorrectAnswers(correctAnswers);
  }, []);

  return (
    <div className={styles.testResult}>
      <div>
        Результат: {correctAnswers}/{passingTest.questions.length}
      </div>
      <div>
        {passingTest.questions.map((question: any, indexQuestion: number) => (
          <div>
            <div>{question.name}</div>
            <div>
              {question.answerVariants.map((variant: any, index: number) => (
                <div className={styles.answerVariants}>
                  <div>{index + 1}.</div>
                  <div>{variant.answer}</div>
                  {tests[passingTest.index].questions[indexQuestion]
                    .answerVariants[index].answerCorrect && (
                    <CheckIcon color='success' />
                  )}
                  {variant.answerCorrect &&
                    variant.answerCorrect !==
                      tests[passingTest.index].questions[indexQuestion]
                        .answerVariants[index].answerCorrect && (
                      <ClearIcon color='error' />
                    )}
                </div>
              ))}
            </div>
          </div>
        ))}
        <div className={styles.button}>
          <Button
            title='Повернутися до тестів'
            onClick={() => {
              dispatch(setPassingTestAC({ test: null, index: 0 }));
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default TestResult;
