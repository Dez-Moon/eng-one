import React, { useEffect, useState } from "react";
import CustomTextField from "../../../Custom-components/TextField/TextField";
import styles from "./styles.module.scss";
import AddIcon from "@mui/icons-material/Add";
import CreateQuestion from "./components/CreateQuestion/CreateQuestion";
import DeleteIcon from "@mui/icons-material/Delete";
import { testsApi } from "../../../../api/tests-api";
import Button from "../../../Custom-components/Buttons/Button";
import { ShowTestContentType } from "../../Tests";

export type AnswerVariantsType = {
  answer: string;
  answerCorrect: boolean;
  id: string;
};
export type QuestionTestType = {
  name: string;
  img: any;
  answerVariants: Array<AnswerVariantsType>;
};
export type CreatingAndPassingTestType = {
  id?: string;
  name: string;
  questions: Array<QuestionTestType>;
  countQuestions: number;
};
type PropsType = {
  id?: string;
  setShowContent: React.Dispatch<React.SetStateAction<ShowTestContentType>>;
};
const TestCreation = React.memo((props: PropsType) => {
  const [test, setTest] = useState<CreatingAndPassingTestType>();

  useEffect(() => {
    if (props.id) {
      testsApi.getTest(props.id).then((response) => setTest(response.data));
    } else {
      const newTest: CreatingAndPassingTestType = {
        name: "Новий тест",
        questions: [],
        countQuestions: 0,
      };
      setTest(newTest);
    }
  }, []);
  const editTestName = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (test) setTest({ ...test, name: e.target.value });
  };
  const addTestQuestion = () => {
    if (test) {
      const newQuestion = {
        name: "Нове питання",
        img: "",
        answerVariants: [],
      };
      const newTest = { ...test, countQuestions: test.countQuestions + 1 };
      newTest.questions.push(newQuestion);
      setTest(newTest);
    }
  };
  const saveTest = async () => {
    if (test) {
      const response = await testsApi.createTest(test);
      props.setShowContent({ type: "main" });
    }
  };
  const deleteTest = () => {
    if (!test?.id) {
      props.setShowContent({ type: "main" });
    } else {
      testsApi.deleteTest(test.id, test.name);
    }
  };
  if (!test) return <div></div>;
  return (
    <div className={styles.testCreation}>
      <div className={styles.testName}>
        <CustomTextField
          autoFocus={true}
          variant='filled'
          label='Назва тесту'
          value={test.name}
          onChange={editTestName}
        />
        <DeleteIcon className={styles.delete} onClick={deleteTest} />
      </div>
      {test.questions.length > 0 &&
        test.questions.map((question: QuestionTestType, index: number) => (
          <CreateQuestion
            question={question}
            indexQuestion={index}
            setTest={setTest}
            test={test}
          />
        ))}
      <div>
        Додати питання
        <span className={styles.plus}>
          <AddIcon onClick={addTestQuestion} />
        </span>
      </div>
      <Button
        title='Зберігти'
        disabled={test.questions.length === 0}
        onClick={saveTest}
      />
    </div>
  );
});

export default TestCreation;
