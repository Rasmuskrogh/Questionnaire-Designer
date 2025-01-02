import { useState } from "react";
import classes from "../css/modal.module.css";
import Button from "./Button";
import { RadioButtonSettingsProps } from "../interface";

const RadioButtonSettings = ({
  closeRadio,
  addRadioGroup,
}: RadioButtonSettingsProps) => {
  const [numOptions, setNumOptions] = useState<number>(1);
  const [question, setQuestion] = useState<string>("");

  const handleAddRadioGroup = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const radioData = {
      question,
      options: Array(numOptions).fill(""),
    };
    addRadioGroup(radioData);
    closeRadio();
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
      <select
        value={numOptions}
        onChange={(e) => setNumOptions(Number(e.target.value))}
      >
        {[...Array(5).keys()].map((i) => (
          <option key={i} value={i + 1}>
            {i + 1}
          </option>
        ))}
      </select>

      <Button
        label="Add Radio Buttons"
        className={classes.addButton}
        onClick={handleAddRadioGroup}
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
