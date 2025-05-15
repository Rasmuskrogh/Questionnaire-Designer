import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Button from "./components/common/Button";
import classes from "./css/app.module.css";
import Questionnaire from "./components/Questionnaire/Questionnaire";
import SuccessPage from "./components/SuccessPage";
import { getDefaultForm } from "./request";
import { DefaultForm } from "./interface";

function App() {
  const [active, setActive] = useState<boolean>(true);
  // State för att hålla default-formuläret
  const [defaultFormData, setDefaultFormData] = useState<DefaultForm | null>(
    null
  );

  const handleVisibility = () => {
    // När "Start Creating" klickas, sätt default-form data
    if (active) {
      const defaultForm = getDefaultForm();
      setDefaultFormData(defaultForm as DefaultForm);
    }
    setActive((prev) => !prev);
  };

  const resetActive = () => {
    setActive(true);
    // Återställ även defaultFormData om du vill återställa formuläret
    setDefaultFormData(null);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <div className={classes.wrappingDiv}>
              <h1>Form Builder</h1>
              {active ? (
                <div className={classes.preButtonClickDiv}>
                  <p>
                    Create a form to share with your team or backend system!
                  </p>
                  <Button label="Start Creating" onClick={handleVisibility} />
                </div>
              ) : (
                <div className={classes.postButtonClickDiv}>
                  <Questionnaire defaultForm={defaultFormData} />
                </div>
              )}
            </div>
          }
        />
        <Route
          path="/success"
          element={<SuccessPage resetActive={resetActive} />}
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
