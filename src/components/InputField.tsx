import { InputFieldProps } from "../types";

function InputField({ input, index, onChange }: InputFieldProps) {
  const isCheckbox = "checkbox" in input;
  const isDate = "date" in input;
  const isInput = "input" in input && !isCheckbox && !isDate;

  return (
    <div>
      {/* Checkbox handling */}
      {isCheckbox && (
        <>
          <input
            type="checkbox"
            checked={input.checkbox === true}
            onChange={(e) => onChange(index, "checkbox", e.target.checked)}
          />
          <input
            type="text"
            value={input.input || ""}
            onChange={(e) => onChange(index, "input", e.target.value)}
            placeholder="Enter input for checkbox"
          />
        </>
      )}

      {/* Date handling */}
      {isDate && (
        <>
          <input
            type="text"
            value={input.label || ""}
            onChange={(e) => onChange(index, "label", e.target.value)}
            placeholder="Label for date"
          />
          <input
            type="date"
            value={input.input || ""}
            onChange={(e) => onChange(index, "input", e.target.value)}
          />
        </>
      )}

      {/* Text input handling (for label/input types) */}
      {isInput && (
        <>
          <input
            type="text"
            value={input.label || ""}
            onChange={(e) => onChange(index, "label", e.target.value)}
            placeholder="Label text"
          />
          <input
            type="text"
            value={input.input || ""}
            onChange={(e) => onChange(index, "input", e.target.value)}
            placeholder="Enter input"
          />
        </>
      )}
    </div>
  );
}

export default InputField;
