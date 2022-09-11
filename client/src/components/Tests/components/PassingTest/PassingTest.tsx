import { Checkbox, CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API } from "../../../../api/api";
import { AppRootStateType } from "../../../../store/store";
import {
  finishedTestTC,
  setSelectedAnswerAC,
  setTestFinishedAC,
} from "../../../../store/tests-reducer";
import Button from "../../../Custom-components/Buttons/Button";
import styles from "./styles.module.scss";

const PassingTest = React.memo(() => {
  const dispatch = useDispatch();
  const passingTest = useSelector<AppRootStateType>(
    (state) => state.tests.passingTest
  ) as any;
  const tests = useSelector<AppRootStateType>(
    (state) => state.tests.tests
  ) as any;
  const [indexVariant, setIndexVariant] = useState(0);
  const [img, setImg] = useState(null) as any;
  const [load, setLoad] = useState(false) as any;

  useEffect(() => {
    if (!img)
      API.getImage(passingTest.questions[indexVariant].img).then((res: any) => {
        setImg(res.data);
      });
    debugger;
  }, [indexVariant]);
  useEffect(() => {
    if (!passingTest.questions[indexVariant].img) setLoad(true);
  }, [indexVariant]);
  const onLoad = () => {
    setLoad(true);
  };
  const getResult = () => {
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
    const thunk = finishedTestTC(passingTest._id, correctAnswers.toString());
    thunk(dispatch);
    dispatch(setTestFinishedAC({ value: true }));
  };
  return (
    <div className={styles.passingTest}>
      <div className={styles.testName}>{passingTest.name}</div>
      <div>
        <div className={styles.question}>
          <div>{passingTest.questions[indexVariant].name}</div>
          <div>
            {img && (
              <div className={styles.img}>
                <img src={img} onLoad={onLoad} />
              </div>
            )}
            {!load ? (
              <div className={styles.imgPreloader}>
                <CircularProgress />
              </div>
            ) : (
              passingTest.questions[indexVariant].answerVariants.map(
                (variant: any, index: number) => {
                  return (
                    <div className={styles.variant}>
                      <div>{index + 1}:</div>
                      <div>{variant.answer}</div>
                      <div>
                        <Checkbox
                          checked={
                            passingTest.questions[indexVariant].answerVariants[
                              index
                            ].answerCorrect
                          }
                          onChange={() => {
                            let value;
                            if (
                              passingTest.questions[indexVariant]
                                .answerVariants[index].answerCorrect
                            ) {
                              value = false;
                            } else {
                              value = true;
                            }
                            dispatch(
                              setSelectedAnswerAC({
                                indexQuestion: indexVariant,
                                indexAnswer: index,
                                value,
                              })
                            );
                          }}
                        />
                      </div>
                    </div>
                  );
                }
              )
            )}
          </div>
        </div>
      </div>
      <div className={styles.buttons}>
        <Button
          title='Попереднє'
          disabled={indexVariant < 1 || !load}
          onClick={() => {
            if (indexVariant > 0) {
              setIndexVariant(indexVariant - 1);
              setImg(null);
              setLoad(false);
            }
          }}
        />
        {indexVariant !== passingTest.questions.length - 1 ? (
          <Button
            title='Наступне'
            disabled={!load}
            onClick={() => {
              if (indexVariant < passingTest.questions.length - 1) {
                setIndexVariant(indexVariant + 1);
                setImg(null);
                setLoad(false);
              }
            }}
          />
        ) : (
          <Button
            title='Отримати результати'
            disabled={!load}
            onClick={getResult}
          />
        )}
      </div>
      <div className={styles.questionPaginator}>
        {passingTest.questions.map((question: any, index: number) => (
          <div
            className={indexVariant === index ? styles.active : ""}
            onClick={() => {
              setIndexVariant(index);
              setImg(null);
              setLoad(false);
            }}
            key={index}
          >
            {index + 1}
          </div>
        ))}
      </div>
    </div>
  );
});

export default PassingTest;
