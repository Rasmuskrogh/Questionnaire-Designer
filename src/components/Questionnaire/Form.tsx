import classes from "../../css/form.module.css";
import { IForm } from "../../interface";
import SkeletonForm from "../../Skeletons/SkeletonForm";
import { InputType } from "../../types";
import Button from "../common/Button";
import { useCallback, useEffect, useState } from "react";

function Form({ inputs, title, isLoading, validationEnabled }: IForm) {
  const [formInputs, setFormInputs] = useState<{ input: string | boolean }[]>(
    []
  );
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [initialInputsState, setInitialInputsState] = useState<InputType[]>([]);

  const isRadio = (
    input: InputType
  ): input is { type: "radio"; question: string; options: string[] } => {
    return (input as { type: string }).type === "radio";
  };
  const isCheckbox = (
    input: InputType
  ): input is { type: "checkbox"; question: string; options: string[] } => {
    return (input as { type: string }).type === "checkbox";
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

  const validateForm = useCallback(() => {
    if (!validationEnabled) return true;

    const newErrors: { [key: string]: string } = {};

    inputs.forEach((input, i) => {
      if ("date" in input && !formInputs[i]?.input) {
        newErrors[i] = "Please choose a valid date";
      }

      if (
        "input" in input &&
        typeof formInputs[i]?.input === "string" &&
        !formInputs[i]?.input.trim()
      ) {
        newErrors[i] = "This field is obligatory";
      }

      if (
        "type" in input &&
        input.type === "checkbox" &&
        !formInputs[i]?.input
      ) {
        return;
      }

      if ("type" in input && input.type === "radio") {
        if (!formInputs[i]?.input) {
          newErrors[i] = "Please choose one alternative";
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [validationEnabled, inputs, formInputs]);

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsSubmitted(true);

    if (validationEnabled && validateForm()) {
      setErrors({});
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
    const formChanged = formInputs.some((input, index) => {
      if ("input" in input && "input" in initialInputsState[index]) {
        return input.input !== initialInputsState[index].input;
      }
      return false;
    });

    if (formChanged && validationEnabled) {
      validateForm();
    }
  }, [formInputs, validationEnabled, initialInputsState, validateForm]);

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
            return { input: "" };
          } else if (isDateInput(input)) {
            return { input: "" };
          }
          return { input: "" };
        })
      );
    }
  }, [inputs, initialInputsState]);

  return (
    <div className={classes.form}>
      {!isLoading ? (
        <>
          <h2 className={classes.formTitle}>{title}</h2>
          {inputs.map((input, i) => {
            const showError = isSubmitted && errors[i];
            if ("date" in input) {
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

            if (
              "input" in input &&
              !("checkbox" in input) &&
              !("radio" in input) &&
              !("date" in input)
            ) {
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

            if ("type" in input && input.type === "checkbox") {
              return (
                <div key={i} className={classes.formDivs}>
                  <label
                    className={`${classes.formLabel} ${classes.formRadioLabel}`}
                  >
                    {input.question}
                  </label>
                  {input.options?.map((option, idx) => (
                    <div key={idx} className={classes.formRadioOptionsDiv}>
                      <input
                        className={classes.checkbox}
                        type="checkbox"
                        id={`checkbox-${i}-${idx}`}
                        value={option}
                        name={`checkbox-${i}`}
                        onChange={(e) =>
                          handleInputChange(i, e.target.checked ? option : "")
                        }
                      />
                      <label
                        className={classes.formRadioOptionLabel}
                        htmlFor={`checkbox-${i}-${idx}`}
                      >
                        {option ? option : "Option"}
                      </label>
                    </div>
                  ))}
                  {showError && (
                    <p className={classes.invalidField}>{errors[i]}</p>
                  )}
                </div>
              );
            }

            if ("type" in input && input.type === "radio") {
              return (
                <div key={i} className={classes.formDivs}>
                  <label
                    className={`${classes.formLabel} ${classes.formRadioLabel}`}
                  >
                    {input.question}
                  </label>
                  {input.options?.map((option, idx) => {
                    const optionValue = option || "Option";
                    return (
                      <div key={idx} className={classes.formRadioOptionsDiv}>
                        <div className={classes.aligningRadioDiv}>
                          <input
                            className={`${classes.radio} ${
                              showError ? classes.invalidRadio : ""
                            }`}
                            type="radio"
                            id={`radio-${i}-${idx}`}
                            value={optionValue}
                            name={`radio-${i}`}
                            onChange={(e) =>
                              handleInputChange(i, e.target.value)
                            }
                          />
                        </div>
                        <label
                          className={classes.formRadioOptionLabel}
                          htmlFor={`radio-${i}-${idx}`}
                        >
                          {optionValue}
                        </label>
                      </div>
                    );
                  })}
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
