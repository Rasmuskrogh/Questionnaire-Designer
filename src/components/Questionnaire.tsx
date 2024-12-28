import { useState } from "react";
import classes from "../css/questionnaire.module.css";

function Questionnaire() {
  const [inputs, setInputs] = useState<{ label: string; input: string }[]>([]);

  const handleAddInput = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setInputs([...inputs, { label: "", input: "" }]);
  };

  const handleChange = (i: number, field: "label" | "input", value: string) => {
    const newInputs = [...inputs];
    newInputs[i] = { ...newInputs[i], [field]: value };
  };

  return (
    <div className={classes.questionnaireWrappingDiv}>
      <form>
        <label>Choose a title:</label>
        <input type="text" placeholder="Title" />
        {inputs.map((input, i) => {
          return (
            <div key={i}>
              <input
                type="text"
                value={input.label}
                onChange={(e) => handleChange(i, "label", e.target.value)}
                placeholder="Label text"
              />
              <input
                type="text"
                value={input.input}
                onChange={(e) => handleChange(i, "input", e.target.value)}
                placeholder="Enter input placeholder"
              />
            </div>
          );
        })}
        <button onClick={handleAddInput}>Add input +</button>
      </form>
    </div>
  );
}

export default Questionnaire;
