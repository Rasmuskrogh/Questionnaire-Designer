import { ModalProps } from "../types";
import Button from "./Button";

import classes from "../css/modal.module.css";

function Modal({ onClose, onAddInput, onAddCheckbox }: ModalProps) {
  return (
    <div className={classes.modal}>
      <div className={classes.modalContent}>
        <h2 className={classes.modalHeader}>Add Input</h2>
        <Button
          onClick={onAddInput}
          className={classes.addButton}
          label="Add Input"
        />
        <Button
          onClick={onAddCheckbox}
          className={classes.addButton}
          label="Add Checkbox"
        />
        <Button
          onClick={onClose}
          className={classes.closeButton}
          label="Cancel"
        />
      </div>
    </div>
  );
}

export default Modal;
