import { Checkbox, CircularProgress } from "@mui/material";
import React, { useState } from "react";
import styles from "./styles.module.scss";
import {
  CreatingAndPassingTestType,
  QuestionTestType,
} from "../../TestСreation/TestCreation";

type PropsType = {
  setTest: any;
  test: CreatingAndPassingTestType;
  indexQuestion: number;
};
const PassTestQuestion = (props: PropsType) => {
  const [load, setLoad] = useState<boolean>(false);
  const { setTest, test, indexQuestion } = props;
  const question = test?.questions[indexQuestion];

  return (
    <div className={styles.question}>
      <div>{question?.name}</div>
      <div>
        {question?.img && (
          <div className={styles.img}>
            <img src={question.img.url} />
          </div>
        )}
        {!load ? (
          <div className={styles.imgPreloader}>
            <CircularProgress />
          </div>
        ) : (
          question?.answerVariants.map((variant: any, indexVariant: number) => {
            const selectVariant = () => {
              if (test) {
                const questionCopy = [...test.questions];
                questionCopy.map((question, index) => {
                  if (index === indexQuestion) {
                    question.answerVariants[indexVariant].answerCorrect =
                      !question.answerVariants[indexVariant].answerCorrect;
                  }
                });
                setTest({ ...test, questions: questionCopy });
              }
            };
            return (
              <div className={styles.variant}>
                <div>{indexVariant + 1}:</div>
                <div>{variant.answer}</div>
                <div>
                  <Checkbox
                    checked={
                      question.answerVariants[indexVariant].answerCorrect
                    }
                    onChange={selectVariant}
                  />
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default PassTestQuestion;
