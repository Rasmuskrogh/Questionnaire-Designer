import classes from "../css/button.module.css";
import { IButton } from "../interface";

function Button({ label, onClick }: IButton) {
  return (
    <button onClick={onClick} className={classes.universalButton}>
      {label}
    </button>
  );
}

export default Button;
