import { InputFieldProps } from "../types";

function InputField({ input, index, onChange }: InputFieldProps) {
  const isCheckbox = "checkbox" in input;

  return (
    <div>
      {isCheckbox ? (
        <input
          type="checkbox"
          checked={input.checkbox === true}
          onChange={(e) => onChange(index, "checkbox", e.target.checked)}
        />
      ) : (
        <input
          type="text"
          value={input.label || ""}
          onChange={(e) => onChange(index, "label", e.target.value)}
          placeholder="Label text"
        />
      )}
      <input
        type="text"
        value={input.input}
        onChange={(e) => onChange(index, "input", e.target.value)}
        placeholder="Enter input placeholder"
      />
    </div>
  );
}

export default InputField;
