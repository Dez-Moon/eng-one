import React from "react";
import { getColorTestResults } from "../../../../functions/functions";
import { TestsOnMainPageType } from "../TestsMain/TestsMain";
import styles from "./styles.module.scss";
import { UserPassedTheTestType } from "./Test";

type PropsType = {
  test: TestsOnMainPageType;
  userPassedTheTest: UserPassedTheTestType;
};
const InfoAboutPassingTest = React.memo((props: PropsType) => {
  return (
    <div className={styles.infoAboutPassingTest}>
      <div>
        Спроб:
        <span>{props.userPassedTheTest.countAttempts}</span>
      </div>
      <div>
        Кращий результат:
        <span style={getColorTestResults(props.userPassedTheTest)}>
          {props.userPassedTheTest?.bestResult}/{props.test.countQuestions}
        </span>
      </div>
    </div>
  );
});

export default InfoAboutPassingTest;
