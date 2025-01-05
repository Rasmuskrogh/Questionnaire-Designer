import classes from "../css/form.module.css";
import { IForm } from "../interface";
import Button from "./Button";

function Form({ inputs, title }: IForm) {
  console.log(inputs);

  const handleSubmit = () => {};

  return (
    <div className={classes.form}>
      <h2 className={classes.formTitle}>{title}</h2>
      {inputs.map((input, i) => {
        if ("date" in input) {
          return (
            <div key={i} className={classes.formDivs}>
              <label className={classes.formLabel}>{input.label}</label>
              <input className={classes.formInputs} type="date" />
            </div>
          );
        }
        if ("checkbox" in input) {
          return (
            <div key={i} className={classes.formCheckboxesDiv}>
              <input type="checkbox" value="false" />
              <label className={classes.formCheckboxesLabel}>
                {input.input}
              </label>
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
                className={classes.formInputs}
                type="text"
                placeholder={input.input}
              />
            </div>
          );
        }

        if ("type" in input && input.type === "radio") {
          if (input.type === "radio") {
            console.log(Array.isArray(input));
            return (
              <form key={i} className={classes.formDivs}>
                <label
                  className={`${classes.formLabel} ${classes.formRadioLabel}`}
                >
                  {input.question}
                </label>
                {input.options.map((option, idx) => (
                  <div key={idx} className={classes.formRadioOptionsDiv}>
                    <input
                      type="radio"
                      id={`option-${i}-${idx}`}
                      value={option}
                      name={`radio-${i}`}
                    />
                    <label
                      className={classes.formRadioOptionLabel}
                      htmlFor={`option-${i}-${idx}`}
                    >
                      {option}
                    </label>
                  </div>
                ))}
              </form>
            );
          }
        }
      })}
      <Button
        label="Submit"
        onClick={handleSubmit}
        className={classes.submitButton}
      />
      ;
    </div>
  );
}

export default Form;
