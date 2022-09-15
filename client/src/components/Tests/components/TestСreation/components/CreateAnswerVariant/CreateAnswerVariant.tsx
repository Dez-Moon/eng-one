import React, { useState } from "react";
import CustomTextField from "../../../../../Custom-components/TextField/TextField";
import ClearIcon from "@mui/icons-material/Clear";
import CheckIcon from "@mui/icons-material/Check";
import DeleteIcon from "@mui/icons-material/Delete";
import styles from "./styles.module.scss";
import {
  AnswerVariantsType,
  CreatingAndPassingTestType,
} from "../../TestCreation";

type PropsType = {
  variant: AnswerVariantsType;
  indexVariant: number;
  indexQuestion: number;
  test: CreatingAndPassingTestType;
  setTest: React.Dispatch<React.SetStateAction<CreatingAndPassingTestType>>;
};
const CreateAnswerVariant = React.memo((props: PropsType) => {
  const { variant, indexVariant, indexQuestion, test, setTest } = props;

  const editVariantName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const testCopy = { ...test };
    testCopy.questions[indexQuestion].answerVariants[indexVariant].answer =
      e.target.value;
    setTest(testCopy);
  };
  const selectVariant = () => {
    const questionCopy = [...test.questions];
    questionCopy.map((question, index) => {
      if (index === indexQuestion) {
        question.answerVariants[indexVariant].answerCorrect =
          !question.answerVariants[indexVariant].answerCorrect;
      }
    });
    setTest({ ...test, questions: questionCopy });
  };
  const deleteVariant = () => {
    const newTest = { ...test };
    newTest.questions[indexQuestion].answerVariants.splice(indexVariant, 1);
    setTest(newTest);
  };
  return (
    <div className={styles.createAnswerVariant}>
      <CustomTextField
        variant='filled'
        autoFocus={true}
        size='small'
        label={`Варiант ${indexVariant + 1}`}
        value={props.variant.answer}
        onChange={editVariantName}
      />
      <div className={styles.icon}>
        {props.variant.answerCorrect ? (
          <CheckIcon className={styles.true} onClick={selectVariant} />
        ) : (
          <ClearIcon className={styles.false} onClick={selectVariant} />
        )}
        <DeleteIcon className={styles.delete} onClick={deleteVariant} />
      </div>
    </div>
  );
});

export default CreateAnswerVariant;
