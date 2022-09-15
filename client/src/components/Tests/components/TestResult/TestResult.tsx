import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { AppRootStateType } from "../../../../store/store";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import Button from "../../../Custom-components/Buttons/Button";

const TestResult = () => {
  // <div className={styles.testResult}>
  //   <div>
  //     Результат: {correctAnswers}/{passingTest.questions.length}
  //   </div>
  //   <div>
  //     {passingTest.questions.map((question: any, indexQuestion: number) => (
  //       <div>
  //         <div>{question.name}</div>
  //         <div>
  //           {question.answerVariants.map((variant: any, index: number) => (
  //             <div className={styles.answerVariants}>
  //               <div>{index + 1}.</div>
  //               <div>{variant.answer}</div>
  //               {tests[passingTest.index].questions[indexQuestion]
  //                 .answerVariants[index].answerCorrect && (
  //                 <CheckIcon color='success' />
  //               )}
  //               {variant.answerCorrect &&
  //                 variant.answerCorrect !==
  //                   tests[passingTest.index].questions[indexQuestion]
  //                     .answerVariants[index].answerCorrect && (
  //                   <ClearIcon color='error' />
  //                 )}
  //             </div>
  //           ))}
  //         </div>
  //       </div>
  //     ))}
  //     <div className={styles.button}>
  //       <Button
  //         title='Повернутися до тестів'
  //         onClick={() => {
  //           dispatch(setPassingTestAC({ test: null, index: 0 }));
  //         }}
  //       />
  //     </div>
  //   </div>
  // </div>
};

export default TestResult;
