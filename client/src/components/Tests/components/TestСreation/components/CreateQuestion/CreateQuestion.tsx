import React, { useState } from "react";
import CustomTextField from "../../../../../Custom-components/TextField/TextField";
import AddIcon from "@mui/icons-material/Add";
import styles from "./styles.module.scss";
import CreateAnswerVariant from "../CreateAnswerVariant/CreateAnswerVariant";
import DeleteIcon from "@mui/icons-material/Delete";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import {
  CreatingAndPassingTestType,
  QuestionTestType,
} from "../../TestCreation";
import { v4 } from "uuid";

type PropsType = {
  question: QuestionTestType;
  indexQuestion: number;
  setTest: any;
  test: CreatingAndPassingTestType;
};

const CreateQuestion = React.memo((props: PropsType) => {
  const [img, setImg] = useState<any>();
  const [load, setLoad] = useState<boolean>();
  const { question, indexQuestion, setTest, test } = props;

  const deleteImage = () => {
    const newQuestions = [...test.questions];
    newQuestions[indexQuestion].img = "";
    setTest({ ...test, questions: newQuestions });
  };
  const editQuestionName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuestions = [...test.questions];
    newQuestions[indexQuestion].name = e.target.value;
    setTest({ ...test, questions: newQuestions });
  };
  const deleteQuestion = () => {
    const newQuestions = [...test.questions];
    newQuestions.splice(indexQuestion, 1);
    setTest({
      ...test,
      countQuestions: test.countQuestions - 1,
      questions: newQuestions,
    });
  };
  const addVariant = () => {
    const newVariant = { answer: "", answerCorrect: false, id: v4() };
    const newQuestions = [...test.questions];
    newQuestions[indexQuestion].answerVariants.push(newVariant);
    setTest({ ...test, questions: newQuestions });
  };
  const addImage = (e: any) => {
    var target = e.target;

    if (!FileReader) {
      alert("FileReader не поддерживается — облом");
      return;
    }

    if (!target.files.length) {
      alert("Ничего не загружено");
      return;
    }

    var fileReader = new FileReader();
    fileReader.onload = function () {
      const a = fileReader.result;
      const newQuestions = [...test.questions];
      newQuestions[indexQuestion].img = target.files[0];
      setImg(a);
      setTest({ ...test, questions: newQuestions });
    };

    fileReader.readAsDataURL(target.files[0]);
  };
  return (
    <div className={styles.createQuestion}>
      <div>
        <div className={styles.questionBlock}>
          <div className={styles.addNewVariant}>
            <span>Додати зображення </span>
            <label className={styles.addImage}>
              <AddAPhotoIcon className={styles.addImageIcon} />
              <input type='file' accept='image/*,' onChange={addImage} />
            </label>
          </div>
          <div className={styles.nameQuestion}>
            <CustomTextField
              autoFocus={true}
              variant='filled'
              size='small'
              label={`Питання ${indexQuestion + 1}`}
              value={question.name}
              onChange={editQuestionName}
            />
            <DeleteIcon className={styles.delete} onClick={deleteQuestion} />
          </div>
          <div className={styles.addNewVariant}>
            <span>Додати варіант відповіді </span>
            <span className={styles.plus}>
              <AddIcon onClick={addVariant} />
            </span>
          </div>
        </div>
      </div>
      <div className={styles.img}>
        <img src={img} />
        {img && (
          <HighlightOffIcon
            className={styles.deleteImgBtn}
            onClick={deleteImage}
          />
        )}
      </div>
      <div className={styles.answerVariants}>
        {props.question.answerVariants.length > 0 &&
          props.question.answerVariants.map((variant: any, index: number) => (
            <CreateAnswerVariant
              variant={variant}
              indexVariant={index}
              indexQuestion={indexQuestion}
              test={test}
              setTest={setTest}
            />
          ))}
      </div>
    </div>
  );
});

export default CreateQuestion;
