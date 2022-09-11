import React, { useEffect, useState } from "react";
import CustomTextField from "../../../Custom-components/TextField/TextField";
import styles from "./styles.module.scss";
import AddIcon from "@mui/icons-material/Add";
import CreateQuestion from "./components/CreateQuestion/CreateQuestion";
import { useDispatch } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  createOrUpdateTestTC,
  createQuestionAC,
  deleteTestTC,
  editQuestionImgAC,
  editTestNameAC,
  setTestsTC,
} from "../../../../store/tests-reducer";
import Button from "../../../Custom-components/Buttons/Button";
import { API } from "../../../../api/api";

type PropsType = {
  tests: Array<{}>;
  test: { name: string; questions: Array<{}>; _id?: any };
  index: number;
  setCreatingTest: any;
  setTestIndex: any;
};

const TestCreation = React.memo((props: PropsType) => {
  const dispatch = useDispatch();
  const [img, setImg] = useState(null) as any;
  useEffect(() => {
    if (img) {
      API.getImage(img).then((res: any) => {
        setImg(res.data);
      });
    }
  });
  if (props.test) {
    return (
      <div className={styles.testCreation}>
        <div className={styles.testName}>
          <CustomTextField
            autoFocus={true}
            variant='filled'
            label='Назва тесту'
            value={props.test.name}
            onChange={(e: any) => {
              dispatch(
                editTestNameAC({ name: e.target.value, index: props.index })
              );
            }}
          />
          <DeleteIcon
            className={styles.delete}
            onClick={() => {
              const thunk = deleteTestTC(props.test["_id"], props.test.name);
              thunk(dispatch);
              props.setCreatingTest(false);
            }}
          />
        </div>
        {props.test.questions.length > 0 &&
          props.test.questions.map((question: any, index: number) => {
            return (
              <CreateQuestion
                key={index}
                question={question}
                index={index}
                indexTest={props.index}
                testName={props.test.name}
              />
            );
          })}
        <div>
          Додати питання
          <span className={styles.plus}>
            <AddIcon
              onClick={() => {
                dispatch(createQuestionAC({ index: props.index }));
              }}
            />
          </span>
        </div>
        <Button
          title='Зберігти'
          disabled={props.test.questions.length === 0}
          onClick={() => {
            const thunk = createOrUpdateTestTC(props.tests[0]);
            thunk(dispatch);
            props.setCreatingTest(false);
            props.setTestIndex(props.tests.length - 1);
          }}
        />
      </div>
    );
  } else return <div></div>;
});

export default TestCreation;
