import React from "react";
import emoji from "../../../../assets/emoji/emoji";

type PropsType = {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
};
const Emoji = (props: PropsType) => {
  return (
    <div className='emojiBlock'>
      {emoji.map((el) => (
        <div>
          <div>{el.name}</div>
          <div className='emojiGroup'>
            {el.smiles.map((smile) => (
              <div
                className='emojiItem'
                onClick={() => props.setValue(props.value + smile)}
              >
                {smile}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Emoji;
