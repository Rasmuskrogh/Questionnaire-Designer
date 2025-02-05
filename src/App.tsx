import { useState } from "react";
import Button from "./components/common/Button";
import classes from "./css/app.module.css";
import Questionnaire from "./components/Questionnaire/Questionnaire";

function App() {
  const [active, setActive] = useState<boolean>(true); //for testing

  const handleVisibility = () => {
    setActive((prev) => !prev);
  };

  return (
    <div className={classes.wrappingDiv}>
      <h1>Form Builder</h1>
      {active ? (
        <div className={classes.preButtonClickDiv}>
          <p>Create a form to share with your team or backend system!</p>
          <Button label="Start Creating" onClick={handleVisibility} />
        </div>
      ) : (
        <div className={classes.postButtonClickDiv}>
          <Questionnaire />
        </div>
      )}
    </div>
  );
}

export default App;
