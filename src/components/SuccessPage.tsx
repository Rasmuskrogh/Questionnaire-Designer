import { useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import classes from "../css/success.module.css";

interface SuccessPageProps {
  resetActive: () => void;
}

const SuccessPage = ({ resetActive }: SuccessPageProps) => {
  const navigate = useNavigate();

  // Använd useCallback för att memoize funktionen
  const goBackToHome = useCallback(() => {
    resetActive();
    navigate("/");
  }, [resetActive, navigate]);

  // Auto-redirect efter 3 sekunder
  useEffect(() => {
    const timer = setTimeout(() => {
      goBackToHome();
    }, 3000);

    return () => clearTimeout(timer);
  }, [goBackToHome]); // Nu är det säkert att ha goBackToHome i dependency array

  return (
    <div className={classes.successContainer}>
      <div className={classes.successCard}>
        <h1 className={classes.successTitle}>Form Successfully Saved!</h1>
        <p className={classes.successText}>
          Your form has been saved to the database.
        </p>
        <p className={classes.redirectText}>
          You will be redirected to the home page in a few seconds...
        </p>
        <button className={classes.homeButton} onClick={goBackToHome}>
          Return to Home
        </button>
      </div>
    </div>
  );
};

export default SuccessPage;
