import React from "react";
import { InputType } from "../types";
import InputField from "./InputField";
import classes from "../css/questionnaire.module.css";
import { IInputWrapper } from "../interface";

const InputWrapper: React.FC<IInputWrapper> = ({
  input,
  index,
  handleChange,
  arrowUpClicked,
  arrowDownClicked,
  deleteInput,
  inputsLength,
}) => {
  const isRadioInput = (
    input: InputType
  ): input is { type: "radio"; question: string; options: string[] } => {
    return (input as { type: string }).type === "radio";
  };

  return (
    <div className={classes.inputWrapper}>
      {isRadioInput(input) ? (
        <div className={classes.radioWrapper}>
          <input
            className={`${classes.textInputRadioButtons} ${classes.radioButtonsQuestion}`}
            type="text"
            value={input.question}
            onChange={(e) => handleChange(index, "question", e.target.value)}
            placeholder="Enter your question"
          />
          {input.options.map((option, i) => (
            <div key={i} className={classes.radioInnerDiv}>
              <input
                type="radio"
                id={`options-${index}-${i}`}
                name={`radio-${index}`}
                disabled
              />
              <input
                className={classes.textInputRadioButtons}
                type="text"
                value={option}
                onChange={(e) =>
                  handleChange(
                    index,
                    "options",
                    input.options.map((opt, optIdx) =>
                      optIdx === i ? e.target.value : opt
                    )
                  )
                }
                placeholder={`Option ${i + 1}`}
              />
            </div>
          ))}
        </div>
      ) : (
        <InputField input={input} index={index} onChange={handleChange} />
      )}
      <div className={classes.moveButtons}>
        <div
          className={`${classes.moveButtonUp} ${
            index === 0 ? classes.removed : ""
          }`}
          onClick={() => arrowUpClicked(index)}
        ></div>
        <div
          className={`${classes.moveButtonDown} ${
            index === inputsLength - 1 ? classes.removed : ""
          }`}
          onClick={() => arrowDownClicked(index)}
        ></div>
      </div>
      <div className={classes.deleteX} onClick={() => deleteInput(index)}>
        &#10060;
      </div>
    </div>
  );
};

export default InputWrapper;
