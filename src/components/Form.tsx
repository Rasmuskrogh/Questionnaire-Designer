import classes from "../css/form.module.css";
import { IForm } from "../interface";
import SkeletonForm from "../Skeletons/SkeletonForm";
import Button from "./Button";
import { useEffect, useState } from "react";

function Form({ inputs, title, isLoading, validationEnabled }: IForm) {
  const [formInputs, setFormInputs] = useState<{ input: string | boolean }[]>(
    inputs.map((input) => {
      if ("options" in input) {
        return { input: "" };
      }
      return { input: "" };
    })
  );

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    inputs.forEach((input, i) => {
      console.log(`Checking input ${i}:`, formInputs[i]?.input); // Loggar värdet för varje fält

      if ("date" in input && !formInputs[i]?.input) {
        newErrors[i] = "Vänligen välj ett giltigt datum.";
      }

      if (
        "input" in input &&
        typeof formInputs[i]?.input === "string" &&
        !formInputs[i]?.input.trim()
      ) {
        newErrors[i] = "Detta fält är obligatoriskt.";
      }

      if (
        "type" in input &&
        input.type === "checkbox" &&
        !formInputs[i]?.input // Ingen checkbox har valts
      ) {
        newErrors[i] = "Vänligen välj åtminstone ett alternativ.";
      }

      if (
        "type" in input &&
        input.type === "radio" &&
        !formInputs[i]?.input // Ingen radioknapp har valts
      ) {
        newErrors[i] = "Vänligen välj ett radioknappsalternativ.";
      }
    });

    console.log("Validation errors:", newErrors); // Loggar alla valideringsfel

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (validationEnabled && validateForm()) {
      setErrors({});
    }
  };

  const handleInputChange = (index: number, value: string | boolean) => {
    setFormInputs((prev) => {
      const newInputs = [...prev];

      // Kolla om objektet har 'type'
      if ("type" in inputs[index]) {
        if (
          inputs[index].type === "checkbox" ||
          inputs[index].type === "radio"
        ) {
          newInputs[index].input = value;
        }
      } else {
        // För de andra typerna, sätt värdet som en string
        newInputs[index].input = value as string;
      }

      return newInputs;
    });
  };

  // Initiera formInputs med tomma strängar eller rätt typ vid första laddningen
  useEffect(() => {
    const initialInputs = inputs.map((input) => {
      if ("type" in input) {
        // Kollar om objektet har 'type' innan vi försöker komma åt den
        if (input.type === "checkbox" || input.type === "radio") {
          return { input: "" }; // Starta med tomt värde för checkbox och radio
        }
      }

      // För andra fält (text, datum) sätt tomt värde
      return { input: "" };
    });

    setFormInputs(initialInputs);
  }, [inputs]);

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
