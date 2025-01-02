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
            placeholder="Enter input for checkbox"
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
            placeholder="Label for date"
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
            placeholder="Label text"
          />
          <input
            className={classes.textInput}
            type="text"
            value={input.input || ""}
            onChange={(e) => onChange(index, "input", e.target.value)}
            placeholder="Enter placeholder"
          />
        </div>
      )}
    </div>
  );
}

export default InputField;
