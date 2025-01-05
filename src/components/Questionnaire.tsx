import { useEffect, useState } from "react";
import classes from "../css/questionnaire.module.css";
import Modal from "./Modal";
import { InputType } from "../types";
import Form from "./Form";
import Button from "./Button";
import { saveForm } from "../request";
import TitleInput from "./TitleInput";
import InputWrapper from "./InputWrapper";

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

  const saveFormToDB = async () => {
    const formData = {
      title,
      inputs,
    };

    try {
      if (!formData.title) {
        throw new Error("Title is empty");
      }
      const result = await saveForm(formData);
      console.log("form saved successfully", result);
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
        <TitleInput title={title} setTitle={setTitle} />
        {inputs.map((input, i) => (
          <InputWrapper
            key={i}
            input={input}
            index={i}
            handleChange={handleChange}
            arrowDownClicked={arrowDownClicked}
            arrowUpClicked={arrowUpClicked}
            deleteInput={deleteInput}
            inputsLength={inputs.length}
          />
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
