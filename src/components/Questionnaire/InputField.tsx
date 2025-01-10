import { InputFieldProps } from "../../types";
import classes from "../../css/inputField.module.css";

function InputField({ input, index, onChange }: InputFieldProps) {
  const isDate = "date" in input;
  const isInput = "input" in input && !isDate;

  return (
    <div className={classes.inputWrapper}>
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
