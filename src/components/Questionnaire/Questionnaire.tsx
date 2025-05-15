import { useEffect, useState } from "react";
import classes from "../../css/questionnaire.module.css";
import Modal from "../common/Modal";
import { InputType } from "../../types";
import Form from "./Form";
import Button from "../common/Button";
import { getPrefilledForm, saveForm } from "../../request";
import TitleInput from "./TitleInput";
import InputWrapper from "./InputWrapper";
import SkeletonQuestionnaire from "../../Skeletons/SkeletonQuestionnaire";
import { useNavigate } from "react-router-dom";
import { IQuestionnaireProps } from "../../interface";

function Questionnaire({ defaultForm = null }: IQuestionnaireProps) {
  const [inputs, setInputs] = useState<InputType[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [validationEnabled, setValidationEnabled] = useState<boolean>(false);
  const navigate = useNavigate();
  const handleAddInput = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setInputs([...inputs, { label: "", input: "" }]);
    setShowModal(false);
  };

  const handleAddCheckbox = (checkboxData: {
    question: string;
    options: string[];
  }) => {
    const newChecboxInput: InputType = {
      type: "checkbox",
      question: checkboxData.question,
      options: checkboxData.options,
    };
    setInputs((prevInputs) => [...prevInputs, newChecboxInput]);
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

  const addRadioCheckboxOption = (
    i: number,
    newOption: string,
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    const newInputs = [...inputs];
    if (
      newInputs[i] &&
      "options" in newInputs[i] &&
      Array.isArray(newInputs[i].options)
    ) {
      newInputs[i].options.push(newOption);
      setInputs(newInputs);
    }
  };

  const removeRadioCheckboxOption = (
    optionI: number,
    inputI: number,
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    const updatedInputs = [...inputs];

    if (
      updatedInputs[inputI] &&
      "options" in updatedInputs[inputI] &&
      Array.isArray(updatedInputs[inputI].options)
    ) {
      updatedInputs[inputI].options.splice(optionI, 1);
      setInputs(updatedInputs);
    }
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

  const saveFormToDB = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
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
      navigate("/success");
    } catch (error) {
      console.error("save form unsuccessful ", error);
    }
  };

  const clearForm = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setTitle("");
    setInputs([]);
  };

  useEffect(() => {
    const fetchPrefilledForm = async () => {
      try {
        if (defaultForm) {
          setTitle(defaultForm.title);
          setInputs(defaultForm.inputs);
        } else {
          const formData = await getPrefilledForm();
          setTitle(formData.title);
          setInputs(formData.inputs);
        }
      } catch (error) {
        console.error("Error loading initial form data", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPrefilledForm();
  }, [defaultForm]);

  return (
    <div className={classes.questionnaireWrappingDiv}>
      {!isLoading ? (
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
              addOption={addRadioCheckboxOption}
              removeOption={removeRadioCheckboxOption}
            />
          ))}
          <div className={classes.addInputAndValidation}>
            <button
              className={classes.addInput}
              onClick={(e) => {
                e.preventDefault();
                setShowModal(true);
              }}
            >
              Add input +
            </button>
            <div className={classes.valdationCheck}>
              <input
                className={classes.validationCheck}
                type="checkbox"
                id="validationCheck"
                checked={validationEnabled}
                onChange={(e) => setValidationEnabled(e.target.checked)}
              />
              <label htmlFor="validationCheck">Enable validation</label>
            </div>
          </div>
          <div className={classes.ButtonWrapperQuestionnaire}>
            <Button
              className={classes.saveFormButton}
              label="Save form"
              onClick={saveFormToDB}
            />
            <Button
              className={classes.clearFormButton}
              label="Clear form"
              onClick={clearForm}
            />
          </div>
        </form>
      ) : (
        <SkeletonQuestionnaire />
      )}

      <Form
        inputs={inputs}
        title={title}
        isLoading={isLoading}
        validationEnabled={validationEnabled}
      />

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
