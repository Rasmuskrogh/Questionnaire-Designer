import { ModalProps } from "../types";
import Button from "./Button";

import classes from "../css/modal.module.css";
import { useState } from "react";
import CreateRadioButtons from "./CreateRadioButtons";
import X from "../assets/x (4).svg";

function Modal({
  onClose,
  onAddInput,
  onAddCheckbox,
  onAddRadio,
  onAddDate,
}: ModalProps) {
  const [radioActive, setRadioActive] = useState<boolean>(false);

  const openRadioModal = () => {
    setRadioActive((prev) => !prev);
  };

  return (
    <div className={classes.modal}>
      {!radioActive ? (
        <div className={classes.modalContent}>
          <h2 className={classes.modalHeader}>Add Input</h2>
          <Button
            onClick={onAddInput}
            className={classes.addButton}
            label="Input"
          />
          <Button
            onClick={onAddCheckbox}
            className={classes.addButton}
            label="Checkbox"
          />
          <Button
            onClick={openRadioModal}
            className={classes.addButton}
            label="Radio Buttons"
          />
          <Button
            onClick={onAddDate}
            className={classes.addButton}
            label="Date"
          />
          <img
            src={X}
            alt="X icon"
            onClick={onClose}
            className={classes.closeButton}
          />
        </div>
      ) : (
        <div className={classes.modalContent}>
          <CreateRadioButtons
            closeRadio={openRadioModal}
            addRadioGroup={(radioData) => {
              onAddRadio(radioData);
              setRadioActive(false);
            }}
          />
        </div>
      )}
    </div>
  );
}

export default Modal;
