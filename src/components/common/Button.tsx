import classes from "../../css/button.module.css";
import { IButton } from "../../interface";

function Button({ label, onClick, className }: IButton) {
  return (
    <button
      onClick={onClick}
      className={`${classes.universalButton} ${className}`}
    >
      {label}
    </button>
  );
}

export default Button;
