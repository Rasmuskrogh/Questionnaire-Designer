import { useState } from "react";
import classes from "../css/modal.module.css";
import Button from "./Button";
import { RadioButtonSettingsProps } from "../interface";

const RadioButtonSettings = ({
  closeRadio,
  addRadioGroup,
}: RadioButtonSettingsProps) => {
  const [numOptions, setNumOptions] = useState<number>(0);
  const [optionLabels, setOptionLabels] = useState<string[]>([]);
  const [question, setQuestion] = useState<string>("");

  const handleNumOptionsChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newNumOptions = Number(e.target.value);
    setNumOptions(newNumOptions);

    setOptionLabels((prev) => {
      const updatedLabels = [...prev];
      while (updatedLabels.length < newNumOptions) {
        updatedLabels.push("");
      }
      return updatedLabels.slice(0, newNumOptions);
    });
  };

  const handleOptionLabelChange = (index: number, value: string) => {
    setOptionLabels((prev) => {
      const updatedLabels = [...prev];
      updatedLabels[index] = value;
      return updatedLabels;
    });
  };

  return (
    <form>
      <h2 className={classes.modalHeader}>Radio Button Settings</h2>
      <label>Question:</label>
      <input
        type="text"
        placeholder="Enter your question"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />

      <label>Number of options:</label>
      <select value={numOptions} onChange={handleNumOptionsChange}>
        {[...Array(5).keys()].map((i) => (
          <option key={i} value={i + 1}>
            {i + 1}
          </option>
        ))}
      </select>

      {[...Array(numOptions)].map((_, index) => (
        <div key={index}>
          <label>Option {index + 1}:</label>
          <input
            type="text"
            value={optionLabels[index]}
            onChange={(e) => handleOptionLabelChange(index, e.target.value)}
            placeholder={`Option ${index + 1}`}
          />
        </div>
      ))}
      <Button
        label="Add Radio Buttons"
        className={classes.addButton}
        onClick={(e) => {
          e.preventDefault();
          const radioData = {
            question,
            options: optionLabels,
          };
          addRadioGroup(radioData);
        }}
      />
      <Button
        label="Cancel"
        className={classes.closeButton}
        onClick={closeRadio}
      />
    </form>
  );
};

export default RadioButtonSettings;
