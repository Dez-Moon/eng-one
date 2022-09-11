import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { Transition } from "react-transition-group";

const AboutMe = () => {
  const [img, setImg] = useState() as any;
  return (
    <div className={styles.aboutMe}>
      <div>
        <img src={img} />
      </div>
      <div>
        <input
          type='file'
          onChange={(e: any) => {
            {
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
                setImg(a);
              };

              fileReader.readAsDataURL(target.files[0]);
            }
          }}
        />
      </div>
    </div>
  );
};

export default AboutMe;
