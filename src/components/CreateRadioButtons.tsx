import { useState } from "react";
import classes from "../css/modal.module.css";
import Button from "./Button";
import { IRadioButtonSettings } from "../interface";
import X from "../assets/x (4).svg";

const RadioButtonSettings = ({
  closeRadio,
  addRadioGroup,
}: IRadioButtonSettings) => {
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
      <div className={classes.radioQuestion}>
        <h2 className={classes.modalHeader}>Radio Button Settings</h2>
        <label className={classes.radioLabels}>Question:</label>
        <input
          type="text"
          placeholder="Enter your question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
      </div>
      <div className={classes.radioNumbers}>
        <label className={classes.radioLabels}>Number of options:</label>
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
      </div>

      <Button
        label="Add Radio Buttons"
        className={classes.addButton}
        onClick={handleAddRadioGroup}
      />
      <img
        src={X}
        alt="X icon"
        className={classes.closeButton}
        onClick={closeRadio}
      />
    </form>
  );
};

export default RadioButtonSettings;
