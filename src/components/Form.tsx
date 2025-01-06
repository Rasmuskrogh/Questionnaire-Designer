import classes from "../css/form.module.css";
import { IForm } from "../interface";
import SkeletonForm from "../Skeletons/SkeletonForm";
import Button from "./Button";

function Form({ inputs, title }: IForm) {
  console.log(inputs);

  const handleSubmit = () => {
    console.log("Form submitted");
  };

  return (
    <div className={classes.form}>
      {inputs && title ? (
        <>
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
                  <input type="checkbox" />
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
              return (
                <form key={i} className={classes.formDivs}>
                  <label
                    className={`${classes.formLabel} ${classes.formRadioLabel}`}
                  >
                    {input.question}
                  </label>
                  {input.options?.map((option, idx) => (
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

            return null; // Hanterar fall där input inte matchar någon condition
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
