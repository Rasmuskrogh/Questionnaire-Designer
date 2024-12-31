import classes from "../css/form.module.css";
import { IForm } from "../interface";

function Form({ inputs }: IForm) {
  console.log(inputs);

  return (
    <div className="test">
      {inputs.map((input, i) => {
        // Kontrollera om input innehåller ett datum
        if ("date" in input) {
          return (
            <div key={i}>
              <label>{input.label}</label>
              <input type="date" value={input.input} />
            </div>
          );
        }
        if ("checkbox" in input) {
          return (
            <div key={i}>
              <input type="checkbox" value="false" />
              <label>{input.input}</label>
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
            <div key={i}>
              <label>{input.label}</label>
              <input type="text" value="" placeholder={input.input} />
            </div>
          );
        }

        if (input.type === "radio") {
          console.log(Array.isArray(input));
          return (
            <div key={i}>
              <label>{input.question}</label>
              {input.options.map((option, index) => (
                <div key={index}>
                  <input
                    type="radio"
                    id={`option-${i}-${index}`}
                    value={option}
                    name={`radio-${i}`}
                  />
                  <label htmlFor={`option-${i}-${index}`}>{option}</label>
                </div>
              ))}
            </div>
          );
        }

        // Du kan lägga till hantering för andra inputtyper här om du vill
        return null;
      })}
    </div>
  );
}

export default Form;
