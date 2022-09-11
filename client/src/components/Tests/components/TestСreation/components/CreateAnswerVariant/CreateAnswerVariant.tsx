import React, { useState } from "react";
import CustomTextField from "../../../../../Custom-components/TextField/TextField";
import ClearIcon from "@mui/icons-material/Clear";
import CheckIcon from "@mui/icons-material/Check";
import DeleteIcon from "@mui/icons-material/Delete";
import styles from "./styles.module.scss";
import { useDispatch } from "react-redux";
import {
  deleteAnswerVariantAC,
  editNameAnswerVariantsAC,
  setCorrectAnswerVariantAC,
} from "../../../../../../store/tests-reducer";

type PropsType = {
  variant: { answer: string; answerCorrect: boolean };
  index: number;
  indexTest: number;
  indexQuestion: number;
  amountTrueAnswer: number;
};
const CreateAnswerVariant = React.memo((props: PropsType) => {
  const dispatch = useDispatch();
  return (
    <div className={styles.createAnswerVariant}>
      <CustomTextField
        variant='filled'
        autoFocus={true}
        size='small'
        label={`Варiант ${props.index + 1}`}
        value={props.variant.answer}
        onChange={(e: any) => {
          dispatch(
            editNameAnswerVariantsAC({
              name: e.target.value,
              indexAnswer: props.index,
              indexTest: props.indexTest,
              indexQuestion: props.indexQuestion,
            })
          );
        }}
      />
      <div className={styles.icon}>
        {props.variant.answerCorrect ? (
          <CheckIcon
            className={styles.true}
            onClick={() => {
              dispatch(
                setCorrectAnswerVariantAC({
                  value: false,
                  indexAnswer: props.index,
                  indexTest: props.indexTest,
                  indexQuestion: props.indexQuestion,
                  amountTrueAnswer: props.amountTrueAnswer - 1,
                })
              );
            }}
          />
        ) : (
          <ClearIcon
            className={styles.false}
            onClick={() => {
              dispatch(
                setCorrectAnswerVariantAC({
                  value: true,
                  indexAnswer: props.index,
                  indexTest: props.indexTest,
                  indexQuestion: props.indexQuestion,
                  amountTrueAnswer: props.amountTrueAnswer + 1,
                })
              );
            }}
          />
        )}
        <DeleteIcon
          className={styles.delete}
          onClick={() => {
            dispatch(
              deleteAnswerVariantAC({
                indexAnswer: props.index,
                indexTest: props.indexTest,
                indexQuestion: props.indexQuestion,
              })
            );
          }}
        />
      </div>
    </div>
  );
});

export default CreateAnswerVariant;
