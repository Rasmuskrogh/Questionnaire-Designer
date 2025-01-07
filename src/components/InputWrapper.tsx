import React from "react";
import { InputType } from "../types";
import InputField from "./InputField";
import classes from "../css/questionnaire.module.css";
import { IInputWrapper } from "../interface";
import Trashcan from "../assets/trash-2 (1).svg";

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
  const isCheckboxInput = (
    input: InputType
  ): input is { type: "checkbox"; question: string; options: string[] } => {
    return (input as { type: string }).type === "checkbox";
  };

  const isRadio = isRadioInput(input);
  const isCheckbox = isCheckboxInput(input);

  return (
    <div className={classes.inputWrapper}>
      <div className={classes.deleteX} onClick={() => deleteInput(index)}>
        <img className={classes.trashcan} src={Trashcan} alt="trashcan" />
      </div>
      <div
        className={`${classes.moveButtons} ${
          (isRadio || isCheckbox) && index === inputsLength - 1
            ? classes.ifRadioButtonsPadding
            : ""
        }`}
      >
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
      {isRadioInput(input) || isCheckboxInput(input) ? (
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
              {isRadioInput(input) ? (
                <input
                  type="radio"
                  id={`options-${index}-${i}`}
                  name={`radio-${index}`}
                  disabled
                />
              ) : (
                <input
                  type="checkbox"
                  id={`options-${index}-${i}`}
                  name={`checkbox-${index}`}
                  disabled
                />
              )}
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
    </div>
  );
};

export default InputWrapper;
