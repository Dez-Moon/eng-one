import React, { useState } from "react";
import styles from "./styles.module.scss";
import TestsMain from "./components/TestsMain/TestsMain";
import TestCreation from "./components/TestСreation/TestCreation";
import PassTest from "./components/PassTest/PassTest";

export type ShowTestContentType = {
  type: "main" | "test-passing" | "test-creation" | "test-result";
  id?: string;
};

const Tests = React.memo(() => {
  const [showContent, setShowContent] = useState<ShowTestContentType>({
    type: "main",
  });

  return (
    <div className={styles.tests}>
      {showContent.type === "main" && (
        <TestsMain setShowContent={setShowContent} />
      )}
      {showContent.type === "test-creation" && (
        <TestCreation id={showContent.id} setShowContent={setShowContent} />
      )}
      {showContent.type === "test-creation" && showContent.id && (
        <PassTest testId={showContent.id} />
      )}
    </div>
  );
});

export default Tests;
