import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";
import { API } from "../api/api";
const slice = createSlice({
  name: "tests",
  initialState: { tests: [], passingTest: null } as any,
  reducers: {
    setTestsAC(state, action: PayloadAction<{ tests: any }>) {
      state.tests = action.payload.tests;
    },
    createTestAC(state) {
      let testsCopy = [...state.tests] as any;
      testsCopy.unshift({
        name: "Новий тест",
        questions: [],
        countQuestions: 0,
        passedTest: [],
      });
      state.tests = testsCopy;
    },
    editTestNameAC(
      state,
      action: PayloadAction<{ name: string; index: number }>
    ) {
      state.tests[action.payload.index].name = action.payload.name;
    },
    deleteTestAC(
      state,
      action: PayloadAction<{ index: number; dispatch: Dispatch }>
    ) {
      state.tests.splice(action.payload.index, 1);
    },
    createQuestionAC(state, action: PayloadAction<{ index: number }>) {
      let questionsCopy = [...state.tests[action.payload.index].questions];
      questionsCopy.push();
      questionsCopy.push({
        name: "Нове питання",
        img: "",
        answerVariants: [],
      });
      state.tests[action.payload.index].countQuestions++;
      state.tests[action.payload.index].questions = questionsCopy;
    },
    editQuestionNameAC(
      state,
      action: PayloadAction<{
        name: string;
        indexTest: number;
        indexQuestion: number;
      }>
    ) {
      state.tests[action.payload.indexTest].questions[
        action.payload.indexQuestion
      ].name = action.payload.name;
    },
    editQuestionImgAC(
      state,
      action: PayloadAction<{
        img: string;
        indexTest: number;
        indexQuestion: number;
      }>
    ) {
      state.tests[action.payload.indexTest].questions[
        action.payload.indexQuestion
      ].img = action.payload.img;
    },
    deleteQuestionImgAC(
      state,
      action: PayloadAction<{
        indexTest: number;
        indexQuestion: number;
      }>
    ) {
      state.tests[action.payload.indexTest].questions[
        action.payload.indexQuestion
      ].img = "";
    },
    deleteQuestionAC(
      state,
      action: PayloadAction<{ indexTest: number; indexQuestion: number }>
    ) {
      state.tests[action.payload.indexTest].questions.splice(
        action.payload.indexQuestion,
        1
      );
      state.tests[action.payload.indexTest].countQuestions--;
    },
    createAnswerVariantsAC(
      state,
      action: PayloadAction<{ indexTest: number; indexQuestion: number }>
    ) {
      state.tests[action.payload.indexTest].questions[
        action.payload.indexQuestion
      ].answerVariants.push({ answer: "", answerCorrect: false });
    },
    editNameAnswerVariantsAC(
      state,
      action: PayloadAction<{
        name: string;
        indexAnswer: number;
        indexTest: number;
        indexQuestion: number;
      }>
    ) {
      state.tests[action.payload.indexTest].questions[
        action.payload.indexQuestion
      ].answerVariants[action.payload.indexAnswer].answer = action.payload.name;
    },
    setCorrectAnswerVariantAC(
      state,
      action: PayloadAction<{
        value: boolean;
        indexAnswer: number;
        indexTest: number;
        indexQuestion: number;
        amountTrueAnswer: number;
      }>
    ) {
      state.tests[action.payload.indexTest].questions[
        action.payload.indexQuestion
      ].answerVariants[action.payload.indexAnswer].answerCorrect =
        action.payload.value;
      state.tests[action.payload.indexTest].questions[
        action.payload.indexQuestion
      ].amountTrueAnswer = action.payload.amountTrueAnswer;
    },
    deleteAnswerVariantAC(
      state,
      action: PayloadAction<{
        indexAnswer: number;
        indexTest: number;
        indexQuestion: number;
      }>
    ) {
      let answerVariantsCopy = [
        ...state.tests[action.payload.indexTest].questions[
          action.payload.indexQuestion
        ].answerVariants,
      ];
      answerVariantsCopy.splice(action.payload.indexAnswer);
      state.tests[action.payload.indexTest].questions[
        action.payload.indexQuestion
      ].answerVariants = answerVariantsCopy;
    },
    setPassingTestAC(
      state,
      action: PayloadAction<{
        test: any;
        index: number;
      }>
    ) {
      if (action.payload.test) {
        let test = {
          ...action.payload.test,
          questions: action.payload.test.questions.map((question: any) => ({
            ...question,
            answerVariants: question.answerVariants.map((variant: any) => ({
              ...variant,
              answerCorrect: false,
            })),
          })),
        };
        test.index = action.payload.index;
        test.testFinished = false;
        state.passingTest = test;
      } else {
        state.passingTest = action.payload.test;
      }
    },
    setSelectedAnswerAC(
      state,
      action: PayloadAction<{
        indexQuestion: number;
        indexAnswer: number;
        value: boolean;
      }>
    ) {
      let test = {
        ...state.passingTest,
        questions: state.passingTest.questions.map((question: any) => ({
          ...question,
          answerVariants: question.answerVariants.map((variant: any) => ({
            ...variant,
          })),
        })),
      };
      test.questions[action.payload.indexQuestion].answerVariants.forEach(
        (variant: any) => {
          variant.answerCorrect = false;
        }
      );
      test.questions[action.payload.indexQuestion].answerVariants[
        action.payload.indexAnswer
      ].answerCorrect = action.payload.value;
      state.passingTest = test;
    },
    setTestFinishedAC(
      state,
      action: PayloadAction<{
        value: boolean;
      }>
    ) {
      state.passingTest.testFinished = action.payload.value;
    },
  },
});
export const TestsReducer = slice.reducer;
export const {
  setTestsAC,
  createTestAC,
  editTestNameAC,
  deleteTestAC,
  createQuestionAC,
  editQuestionNameAC,
  editQuestionImgAC,
  deleteQuestionImgAC,
  deleteQuestionAC,
  createAnswerVariantsAC,
  editNameAnswerVariantsAC,
  setCorrectAnswerVariantAC,
  deleteAnswerVariantAC,
  setPassingTestAC,
  setSelectedAnswerAC,
  setTestFinishedAC,
} = slice.actions;

export const setTestsTC = () => (dispatch: Dispatch) => {
  API.getTests()
    .then((res: any) => {
      dispatch(setTestsAC({ tests: res.data }));
    })
    .catch((err: any) => {
      console.log(err);
    });
};
export const createOrUpdateTestTC = (test: any) => (dispatch: Dispatch) => {
  if (!test.hasOwnProperty("_id")) {
    API.addTest(test)
      .then((res: any) => {
        API.getTests()
          .then((res: any) => {
            dispatch(setTestsAC({ tests: res.data }));
          })
          .catch((err: any) => {
            console.log(err);
          });
      })
      .catch((err: any) => {
        console.log(err);
      });
  } else {
    API.updateTest(test)
      .then((res: any) => {
        API.getTests()
          .then((res: any) => {
            dispatch(setTestsAC({ tests: res.data }));
          })
          .catch((err: any) => {
            console.log(err);
          });
      })
      .catch((err: any) => {
        console.log(err);
      });
  }
};
export const deleteTestTC =
  (id: string, testName: string) => (dispatch: Dispatch) => {
    API.deleteTest(id, testName)
      .then((res: any) => {
        API.getTests()
          .then((res: any) => {
            dispatch(setTestsAC({ tests: res.data }));
          })
          .catch((err: any) => {
            console.log(err);
          });
      })
      .catch((err: any) => {
        console.log(err);
      });
  };
export const finishedTestTC =
  (testId: string, correctAnswers: string) => (dispatch: Dispatch) => {
    API.finishedTest(testId, correctAnswers).then((res) => {});
  };
