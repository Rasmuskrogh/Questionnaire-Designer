import { InputFieldProps } from "../types";
import classes from "../css/inputField.module.css";

function InputField({ input, index, onChange }: InputFieldProps) {
  const isCheckbox = "checkbox" in input;
  const isDate = "date" in input;
  const isInput = "input" in input && !isCheckbox && !isDate;

  return (
    <div className={classes.inputWrapper}>
      {isCheckbox && (
        <div className={classes.inputFieldCheckbox}>
          <input
            type="checkbox"
            checked={input.checkbox === true}
            onChange={(e) => onChange(index, "checkbox", e.target.checked)}
          />
          <input
            className={classes.textInputCheckbox}
            type="text"
            value={input.input || ""}
            onChange={(e) => onChange(index, "input", e.target.value)}
            placeholder="Enter checkbox value"
          />
        </div>
      )}

      {isDate && (
        <div className={classes.inputFieldDate}>
          <input
            className={classes.textInput}
            type="text"
            value={input.label || ""}
            onChange={(e) => onChange(index, "label", e.target.value)}
            placeholder="Enter date label"
          />
        </div>
      )}

      {isInput && (
        <div className={classes.inputFieldInput}>
          <input
            className={classes.textInput}
            type="text"
            value={input.label || ""}
            onChange={(e) => onChange(index, "label", e.target.value)}
            placeholder="Enter a question"
          />
          <input
            className={classes.textInput}
            type="text"
            value={input.input || ""}
            onChange={(e) => onChange(index, "input", e.target.value)}
            placeholder="Placeholder answer"
          />
        </div>
      )}
    </div>
  );
}

export default InputField;
