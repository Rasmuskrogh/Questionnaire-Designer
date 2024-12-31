import { useState } from "react";
import classes from "../css/questionnaire.module.css";
import InputField from "./InputField";
import Modal from "./Modal";
import { InputType } from "../types";
import Form from "./Form";

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

  const handleAddRadio = (radioData: {
    question: string;
    options: string[];
  }) => {
    const newRadioInput: InputType = {
      type: "radio",
      question: radioData.question,
      options: radioData.options,
    };

    setInputs((prevInputs) => [...prevInputs, newRadioInput]);
    setShowModal(false);
  };

  const handleAddDate = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setInputs([...inputs, { date: "", input: "" }]);
    setShowModal(false);
  };

  const handleChange = (
    i: number,
    field: "label" | "input" | "checkbox" | "date",
    value: string | boolean
  ) => {
    const newInputs = [...inputs];
    newInputs[i] = { ...newInputs[i], [field]: value };
    setInputs(newInputs);
  };

  const isRadioInput = (
    input: InputType
  ): input is { type: "radio"; question: string; options: string[] } => {
    return (input as { type: string }).type === "radio";
  };

  return (
    <div className={classes.questionnaireWrappingDiv}>
      <form>
        <label>Choose a title:</label>
        <input type="text" placeholder="Title" />

        {inputs.map((input, i) => {
          if (isRadioInput(input)) {
            return (
              <div key={i}>
                <h3>{input.question}</h3>
                {input.options.map((option, index) => (
                  <div key={index}>
                    <input
                      type="radio"
                      id={`options-${i}-${index}`}
                      name={`radio-${i}`}
                    />
                    <label htmlFor={`option-${i}-${index}`}>{option}</label>
                  </div>
                ))}
              </div>
            );
          } else {
            return (
              <InputField
                key={i}
                input={input}
                index={i}
                onChange={handleChange}
              />
            );
          }
        })}

        <button
          onClick={(e) => {
            e.preventDefault();
            setShowModal(true);
          }}
        >
          Add input +
        </button>
      </form>
      <Form inputs={inputs} />

      {showModal && (
        <Modal
          onClose={() => setShowModal(false)}
          onAddInput={handleAddInput}
          onAddCheckbox={handleAddCheckbox}
          onAddRadio={handleAddRadio}
          onAddDate={handleAddDate}
        />
      )}
    </div>
  );
}

export default Questionnaire;
