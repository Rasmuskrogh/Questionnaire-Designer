import { useState } from "react";
import classes from "../css/questionnaire.module.css";
import Button from "./Button";
import InputField from "./InputField";
import Modal from "./Modal";

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
        {inputs.map((input, index) => (
          <InputField
            key={index}
            input={input}
            index={index}
            onChange={handleChange}
          />
        ))}
        <button
          onClick={(e) => {
            e.preventDefault();
            setShowModal(true);
          }}
        >
          Add input +
        </button>
      </form>

      {showModal && (
        <Modal
          onClose={() => setShowModal(false)}
          onAddInput={handleAddInput}
          onAddCheckbox={handleAddCheckbox}
        />
      )}
    </div>
  );
}

export default Questionnaire;
