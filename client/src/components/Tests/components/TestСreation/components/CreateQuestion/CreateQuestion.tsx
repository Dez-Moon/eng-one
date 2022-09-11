import React, { createRef, useEffect, useRef, useState } from "react";
import CustomTextField from "../../../../../Custom-components/TextField/TextField";
import AddIcon from "@mui/icons-material/Add";
import styles from "./styles.module.scss";
import CreateAnswerVariant from "../CreateAnswerVariant/CreateAnswerVariant";
import DeleteIcon from "@mui/icons-material/Delete";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { useDispatch } from "react-redux";
import {
  createAnswerVariantsAC,
  deleteQuestionAC,
  deleteQuestionImgAC,
  editQuestionImgAC,
  editQuestionNameAC,
} from "../../../../../../store/tests-reducer";
import { API } from "../../../../../../api/api";
import { CircularProgress } from "@mui/material";

type PropsType = {
  question: {
    name: string;
    img: any;
    answerVariants: Array<{}>;
    amountTrueAnswer: number;
  };
  testName: string;
  index: number;
  indexTest: number;
};

const CreateQuestion = React.memo((props: PropsType) => {
  const dispatch = useDispatch();
  const [img, setImg] = useState(null) as any;
  const [load, setLoad] = useState(false);
  useEffect(() => {
    if (props.question.img)
      API.getImage(props.question.img).then((res: any) => {
        setImg(res.data);
      });
  });
  const onLoad = () => {
    setLoad(true);
  };
  return (
    <div className={styles.createQuestion}>
      <div>
        <div className={styles.questionBlock}>
          <div className={styles.addNewVariant}>
            <span>Додати зображення </span>
            <label className={styles.addImage}>
              <AddAPhotoIcon className={styles.addImageIcon} />
              <input
                type='file'
                accept='image/*,image/jpeg'
                onChange={(e: any) => {
                  API.uploadFile(e.target.files[0], props.testName).then(
                    (res: any) => {
                      dispatch(
                        editQuestionImgAC({
                          img: res.data,
                          indexTest: props.indexTest,
                          indexQuestion: props.index,
                        })
                      );
                      e.target.value = null;
                    }
                  );
                }}
              />
            </label>
          </div>
          <div className={styles.nameQuestion}>
            <CustomTextField
              autoFocus={true}
              variant='filled'
              size='small'
              label={`Питання ${props.index + 1}`}
              value={props.question.name}
              onChange={(e: any) => {
                dispatch(
                  editQuestionNameAC({
                    name: e.target.value,
                    indexTest: props.indexTest,
                    indexQuestion: props.index,
                  })
                );
              }}
            />
            <DeleteIcon
              className={styles.delete}
              onClick={() => {
                dispatch(
                  deleteQuestionAC({
                    indexTest: props.indexTest,
                    indexQuestion: props.index,
                  })
                );
              }}
            />
          </div>
          <div className={styles.addNewVariant}>
            <span>Додати варіант відповіді </span>
            <span className={styles.plus}>
              <AddIcon
                onClick={() => {
                  dispatch(
                    createAnswerVariantsAC({
                      indexTest: props.indexTest,
                      indexQuestion: props.index,
                    })
                  );
                }}
              />
            </span>
          </div>
        </div>
      </div>
      {props.question.img && (
        <div className={styles.img}>
          <div>
            <img src={img} onLoad={onLoad} />
          </div>
          {load ? (
            <div>
              <HighlightOffIcon
                className={styles.deleteImgBtn}
                onClick={() => {
                  dispatch(
                    deleteQuestionImgAC({
                      indexTest: props.indexTest,
                      indexQuestion: props.index,
                    })
                  );
                }}
              />
            </div>
          ) : (
            <div className={styles.imgPreloader}>
              <CircularProgress />
            </div>
          )}
        </div>
      )}
      <div className={styles.answerVariants}>
        {props.question.answerVariants.length > 0 &&
          props.question.answerVariants.map((variant: any, index: number) => (
            <CreateAnswerVariant
              variant={variant}
              index={index}
              indexTest={props.indexTest}
              indexQuestion={props.index}
              amountTrueAnswer={props.question.amountTrueAnswer}
            />
          ))}
      </div>
    </div>
  );
});

export default CreateQuestion;
