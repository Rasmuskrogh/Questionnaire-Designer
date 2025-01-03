import { useEffect, useState } from "react";
import classes from "../css/questionnaire.module.css";
import InputField from "./InputField";
import Modal from "./Modal";
import { InputType } from "../types";
import Form from "./Form";
import Button from "./Button";
import { saveForm } from "../request";

function Questionnaire() {
  const [inputs, setInputs] = useState<InputType[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [title, setTitle] = useState("");

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
    setInputs([...inputs, { date: "", input: "", label: "" }]);
    setShowModal(false);
  };

  const handleChange = (
    i: number,
    field: "label" | "input" | "checkbox" | "date" | "options" | "question",
    value: string | boolean | string[]
  ) => {
    const newInputs = [...inputs];
    newInputs[i] = { ...newInputs[i], [field]: value };
    setInputs(newInputs);
  };

  const arrowUpClicked = (i: number) => {
    if (i > 0) {
      const newInputs = [...inputs];
      [newInputs[i], newInputs[i - 1]] = [newInputs[i - 1], newInputs[i]];
      setInputs(newInputs);
    }
  };

  const arrowDownClicked = (i: number) => {
    if (i < inputs.length - 1) {
      const newInputs = [...inputs];
      [newInputs[i], newInputs[i + 1]] = [newInputs[i + 1], newInputs[i]];
      setInputs(newInputs);
    }
  };

  const deleteInput = (i: number) => {
    const newInputs = [...inputs];
    newInputs.splice(i, 1);
    setInputs(newInputs);
  };

  const isRadioInput = (
    input: InputType
  ): input is { type: "radio"; question: string; options: string[] } => {
    return (input as { type: string }).type === "radio";
  };

  const saveFormToDB = async () => {
    const formData = {
      title,
      inputs,
    };

    try {
      const result = await saveForm(formData);
      console.log("form saved successfully");
    } catch (error) {
      console.error("save form unsuccessful ", error);
    }
  };

  useEffect(() => {
    console.log(inputs);
  }, []);

  return (
    <div className={classes.questionnaireWrappingDiv}>
      <form className={classes.questionnairForm}>
        <label className={classes.formHeaderLabel}>Choose a form title:</label>
        <input
          className={classes.titleInput}
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {inputs.map((input, i) => (
          <div key={i} className={classes.inputWrapper}>
            {isRadioInput(input) ? (
              <div className={classes.radioWrapper}>
                <input
                  className={`${classes.textInputRadioButtons} ${classes.radioButtonsQuestion}`}
                  type="text"
                  value={input.question}
                  onChange={(e) => handleChange(i, "question", e.target.value)}
                  placeholder="Enter your question"
                />
                {input.options.map((option, index) => (
                  <div key={index} className={classes.radioInnerDiv}>
                    <input
                      type="radio"
                      id={`options-${i}-${index}`}
                      name={`radio-${i}`}
                      disabled
                    />
                    <input
                      className={classes.textInputRadioButtons}
                      type="text"
                      value={option}
                      onChange={(e) =>
                        handleChange(
                          i,
                          "options",
                          input.options.map((opt, optIdx) =>
                            optIdx === index ? e.target.value : opt
                          )
                        )
                      }
                      placeholder={`Option ${index + 1}`}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <InputField
                key={i}
                input={input}
                index={i}
                onChange={handleChange}
              />
            )}
            {inputs.length > 1 ? (
              <div className={classes.moveButtons}>
                <div
                  className={`${classes.moveButtonUp}${
                    i === 0 ? classes.removed : ""
                  }`}
                  onClick={() => arrowUpClicked(i)}
                ></div>
                <div
                  className={`${classes.moveButtonDown} ${
                    i === inputs.length - 1 ? classes.removed : ""
                  }`}
                  onClick={() => arrowDownClicked(i)}
                ></div>
              </div>
            ) : (
              ""
            )}
            <div className={classes.deleteX} onClick={() => deleteInput(i)}>
              &#10060;
            </div>
          </div>
        ))}

        <button
          className={classes.addInput}
          onClick={(e) => {
            e.preventDefault();
            setShowModal(true);
          }}
        >
          Add input +
        </button>
        <Button
          className={classes.saveFormButton}
          label="Save form"
          onClick={saveFormToDB}
        />
      </form>
      <Form inputs={inputs} title={title} />

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
