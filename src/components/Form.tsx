import classes from "../css/form.module.css";
import { IForm } from "../interface";
import SkeletonForm from "../Skeletons/SkeletonForm";
import Button from "./Button";
import { useState } from "react";

function Form({ inputs, title, isLoading, validationEnabled }: IForm) {
  // Initialisera formInputs baserat på inputs
  const [formInputs, setFormInputs] = useState(
    inputs.map((input) => {
      if ("input" in input) {
        return { input: "" }; // För textinput
      }
      if ("date" in input) {
        return { input: "" }; // För datuminput
      }
      if ("options" in input) {
        return { input: "" }; // För radio/checkbox
      }
      return { input: "" }; // Standardvärde
    })
  );
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Funktion för att validera formuläret
  const validateForm = () => {
    if (validationEnabled) {
      const newErrors: { [key: string]: string } = {};

      inputs.forEach((input, i) => {
        // Validering för datum
        if ("date" in input && !formInputs[i]?.input) {
          newErrors[i] = "Please select a valid date.";
        }

        // Validering för textinput
        if ("input" in input && !formInputs[i]?.input) {
          newErrors[i] = "This field is required.";
        }

        // Validering för checkbox
        if (
          "type" in input &&
          input.type === "checkbox" &&
          !formInputs[i]?.input
        ) {
          newErrors[i] = "Please select an option.";
        }

        // Validering för radio
        if (
          "type" in input &&
          input.type === "radio" &&
          !formInputs[i]?.input
        ) {
          newErrors[i] = "Please select a radio option.";
        }
      });

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0; // Om inga fel hittas
    }
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (validationEnabled) {
      if (validateForm()) {
        console.log("Form is valid", formInputs);
        setErrors({});
      } else {
        console.log("Form is invalid");
      }
    }
  };

  const handleInputChange = (index: number, value: string) => {
    setFormInputs((prev) => {
      if (prev[index]) {
        // Kolla att elementet existerar innan du ändrar det
        const newInputs = [...prev];
        newInputs[index].input = value; // Uppdatera det specifika fältet
        return newInputs;
      } else {
        console.error(`Index ${index} is out of bounds in formInputs.`);
        return prev; // Returnera oförändrad array om index inte är giltigt
      }
    });
  };

  return (
    <div className={classes.form}>
      {!isLoading ? (
        <>
          <h2 className={classes.formTitle}>{title}</h2>
          {inputs.map((input, i) => {
            if ("date" in input) {
              return (
                <div key={i} className={classes.formDivs}>
                  <label className={classes.formLabel}>{input.label}</label>
                  <input
                    className={`${classes.formInputs} ${
                      errors[i] ? classes.invalidInput : ""
                    }`}
                    type="date"
                    onChange={(e) => handleInputChange(i, e.target.value)}
                  />
                  {errors[i] && (
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
                      errors[i] ? classes.invalidInput : ""
                    }`}
                    type="text"
                    placeholder={input.input}
                    onChange={(e) => handleInputChange(i, e.target.value)}
                  />
                  {errors[i] && (
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
                        type="checkbox"
                        id={`option-${i}-${idx}`}
                        value={option}
                        name={`checkbox-${i}`}
                        onChange={(e) =>
                          handleInputChange(i, e.target.checked ? option : "")
                        }
                      />
                      <label
                        className={classes.formRadioOptionLabel}
                        htmlFor={`option-${i}-${idx}`}
                      >
                        {option}
                      </label>
                    </div>
                  ))}
                  {errors[i] && (
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
                  {input.options?.map((option, idx) => (
                    <div key={idx} className={classes.formRadioOptionsDiv}>
                      <div className={classes.aligningRadioDiv}>
                        <input
                          className={`${classes.radio} ${
                            errors[i] ? classes.invalidRadio : ""
                          }`}
                          type="radio"
                          id={`option-${i}-${idx}`}
                          value={option}
                          name={`radio-${i}`}
                          onChange={(e) => handleInputChange(i, e.target.value)}
                        />
                      </div>
                      <label
                        className={classes.formRadioOptionLabel}
                        htmlFor={`option-${i}-${idx}`}
                      >
                        {option}
                      </label>
                    </div>
                  ))}
                  {errors[i] && (
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
