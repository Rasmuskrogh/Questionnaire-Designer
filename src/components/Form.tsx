import { useState, useEffect } from "react";
import classes from "../css/form.module.css";
import SkeletonForm from "../Skeletons/SkeletonForm";
import { IForm } from "../interface";
import Button from "./Button";
import { InputType } from "../types";

function Form({ inputs, title, isLoading, validationEnabled }: IForm) {
  const [formInputs, setFormInputs] = useState<{ input: string | boolean }[]>(
    []
  );
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [initialInputsState, setInitialInputsState] = useState<InputType[]>([]);

  // Typguards för att kontrollera olika inputtyper
  const isRadio = (
    input: InputType
  ): input is { type: "radio"; question: string; options: string[] } => {
    return (input as { type: "radio" }).type === "radio";
  };

  const isCheckbox = (
    input: InputType
  ): input is { type: "checkbox"; question: string; options: string[] } => {
    return (input as { type: "checkbox" }).type === "checkbox";
  };

  const isTextInput = (
    input: InputType
  ): input is { label: string; input: string } => {
    return (input as { label: string; input: string }).input !== undefined;
  };

  const isDateInput = (
    input: InputType
  ): input is { date: string; input: string; label: string } => {
    return (input as { date: string }).date !== undefined;
  };

  const validateForm = () => {
    if (!validationEnabled) return true;

    const newErrors: { [key: string]: string } = {};

    inputs.forEach((input, i) => {
      if (isDateInput(input) && !formInputs[i]?.input) {
        newErrors[i] = "Vänligen välj ett giltigt datum.";
      }

      // Behåller den ursprungliga lösningen för att undvika trim-fel
      if (
        "input" in input &&
        typeof formInputs[i]?.input === "string" &&
        !formInputs[i]?.input.trim()
      ) {
        newErrors[i] = "Detta fält är obligatoriskt.";
      }

      if ((isRadio(input) || isCheckbox(input)) && !formInputs[i]?.input) {
        newErrors[i] = "Vänligen välj ett alternativ.";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsSubmitted(true);

    if (validationEnabled && validateForm()) {
      setErrors({});
      // Handle form submission logic here
    }
  };

  const handleInputChange = (index: number, value: string | boolean) => {
    setFormInputs((prev) => {
      const newInputs = [...prev];
      newInputs[index].input = value;
      return newInputs;
    });
  };

  useEffect(() => {
    const shouldUpdateState =
      inputs.length !== initialInputsState.length ||
      inputs.some((input, i) => {
        if (
          (isRadio(input) || isCheckbox(input)) &&
          (isRadio(initialInputsState[i]) || isCheckbox(initialInputsState[i]))
        ) {
          return input.options.length !== initialInputsState[i].options.length;
        }
        return false;
      }) ||
      !inputs.every((input, i) => {
        return JSON.stringify(input) === JSON.stringify(initialInputsState[i]);
      });

    if (shouldUpdateState) {
      const inputsCopy = [...inputs];
      setInitialInputsState(inputsCopy);
      setFormInputs(
        inputsCopy.map((input) => {
          if (isTextInput(input)) {
            return { input: input.input || "" };
          } else if (isRadio(input) || isCheckbox(input)) {
            return { input: "" }; // För radioknappar och checkboxar, sätt standardvärde
          } else if (isDateInput(input)) {
            return { input: "" }; // För datumfält, sätt standardvärde
          }
          return { input: "" };
        })
      );
    }
  }, [inputs]);

  return (
    <div className={classes.form}>
      {!isLoading ? (
        <>
          <h2 className={classes.formTitle}>{title}</h2>
          {inputs.map((input, i) => {
            const showError = isSubmitted && errors[i];
            if (isDateInput(input)) {
              return (
                <div key={i} className={classes.formDivs}>
                  <label className={classes.formLabel}>{input.label}</label>
                  <input
                    className={`${classes.formInputs} ${
                      showError ? classes.invalidInput : ""
                    }`}
                    type="date"
                    onChange={(e) => handleInputChange(i, e.target.value)}
                  />
                  {showError && (
                    <p className={classes.invalidField}>{errors[i]}</p>
                  )}
                </div>
              );
            }

            if (isTextInput(input)) {
              return (
                <div key={i} className={classes.formDivs}>
                  <label className={classes.formLabel}>{input.label}</label>
                  <input
                    className={`${classes.formInputs} ${
                      showError ? classes.invalidInput : ""
                    }`}
                    type="text"
                    placeholder={input.input}
                    onChange={(e) => handleInputChange(i, e.target.value)}
                  />
                  {showError && (
                    <p className={classes.invalidField}>{errors[i]}</p>
                  )}
                </div>
              );
            }

            if (isRadio(input) || isCheckbox(input)) {
              return (
                <div key={i} className={classes.formDivs}>
                  <label
                    className={`${classes.formLabel} ${classes.formRadioLabel}`}
                  >
                    {input.question}
                  </label>
                  {input.options?.map((option, idx) => (
                    <div key={idx} className={classes.formRadioOptionsDiv}>
                      <div className={classes.aligningRadioDiv}>
                        <input
                          className={`${classes.radio} ${
                            showError ? classes.invalidRadio : ""
                          }`}
                          type="radio"
                          id={`radio-${i}-${idx}`}
                          value={option}
                          name={`radio-${i}`}
                          onChange={(e) => handleInputChange(i, e.target.value)}
                        />
                      </div>
                      <label
                        className={classes.formRadioOptionLabel}
                        htmlFor={`radio-${i}-${idx}`}
                      >
                        {option || "Option"}
                      </label>
                    </div>
                  ))}
                  {showError && (
                    <p className={classes.invalidField}>{errors[i]}</p>
                  )}
                </div>
              );
            }

            return null;
          })}
        </>
      ) : (
        <SkeletonForm />
      )}
      <Button
        label="Submit"
        onClick={handleSubmit}
        className={classes.submitButton}
      />
    </div>
  );
}

export default Form;
