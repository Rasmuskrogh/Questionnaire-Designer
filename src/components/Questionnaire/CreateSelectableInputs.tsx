import { useState } from "react";
import classes from "../../css/modal.module.css";
import Button from "../common/Button";
import { ISelectableSettings } from "../../interface";
import X from "../../assets/x (4).svg";

const CreateSelectableInputs = ({
  closeSelectableModal,
  addSelectableGroup,
  selectablesType,
}: ISelectableSettings) => {
  const [numOptions, setNumOptions] = useState<number>(1);
  const [question, setQuestion] = useState<string>("");

  const handleAddSelectableGroup = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const selectablesData = {
      question,
      options: Array(numOptions).fill(""),
    };
    addSelectableGroup(selectablesData);
    closeSelectableModal();
  };

  return (
    <form>
      <div className={classes.radioQuestion}>
        <h2 className={classes.modalHeader}>
          {selectablesType === "radio"
            ? "Radio Button Settings"
            : "Checkbox Settings"}
        </h2>
        <label className={classes.radioLabels}>Question:</label>
        <input
          className={classes.radioInputs}
          type="text"
          placeholder="Enter your question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
      </div>
      <div className={classes.radioNumbers}>
        <label className={classes.radioLabels}>Number of options:</label>
        <select
          className={classes.radioSelect}
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
        label={
          selectablesType === "radio" ? "Add Radio Buttons" : "Add Checkboxes"
        }
        className={classes.addButton}
        onClick={handleAddSelectableGroup}
      />
      <img
        src={X}
        alt="X icon"
        className={classes.closeButton}
        onClick={closeSelectableModal}
      />
    </form>
  );
};

export default CreateSelectableInputs;
