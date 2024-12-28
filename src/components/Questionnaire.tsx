import { useState } from "react";
import classes from "../css/questionnaire.module.css";
import Button from "./Button";

type InputType =
  | { label: string; input: string }
  | { checkbox: boolean; input: string };

function Questionnaire() {
  const [inputs, setInputs] = useState<InputType[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleAddInput = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setInputs([...inputs, { label: "", input: "" }]);
    setShowModal(false);
  };

  const handleAddCheckbox = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setInputs([...inputs, { checkbox: false, input: "" }]);
    setShowModal(false);
  };

  const handleOpenModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowModal(true);
  };

  const handleChange = (
    i: number,
    field: "label" | "input" | "checkbox",
    value: string | boolean
  ) => {
    const newInputs = [...inputs];
    newInputs[i] = { ...newInputs[i], [field]: value };
    setInputs(newInputs);
  };

  return (
    <div className={classes.questionnaireWrappingDiv}>
      <form>
        <label>Choose a title:</label>
        <input type="text" placeholder="Title" />
        {inputs.map((input, i) => {
          const isCheckbox = "checkbox" in input;

          return (
            <div key={i}>
              {isCheckbox ? (
                <input
                  type="checkbox"
                  checked={input.checkbox === true}
                  onChange={(e) =>
                    handleChange(i, "checkbox", e.target.checked ? true : false)
                  }
                  placeholder="Label text"
                />
              ) : (
                <input
                  type="text"
                  value={(input as { label: string; input: string }).label}
                  onChange={(e) => handleChange(i, "label", e.target.value)}
                  placeholder="Label text"
                />
              )}
              <input
                type="text"
                value={input.input}
                onChange={(e) => handleChange(i, "input", e.target.value)}
                placeholder="Enter input placeholder"
              />
            </div>
          );
        })}
        <button onClick={handleOpenModal}>Add input +</button>
      </form>

      {showModal && (
        <div className={classes.modal}>
          <div className={classes.modalContent}>
            <h2 className={classes.modalHeader}>Add Input</h2>
            <Button
              onClick={handleAddInput}
              className={classes.addButton}
              label="Add Input"
            />
            <Button
              onClick={handleAddCheckbox}
              className={classes.addButton}
              label="Add Checkbox"
            />
            <Button
              onClick={() => setShowModal(false)}
              className={classes.closeButton}
              label="cancel"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Questionnaire;
