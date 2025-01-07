import { ModalProps } from "../types";
import Button from "./Button";

import classes from "../css/modal.module.css";
import { useState } from "react";
import CreateSelectableInputs from "./CreateSelectableInputs";
import X from "../assets/x (4).svg";

function Modal({
  onClose,
  onAddInput,
  onAddCheckbox,
  onAddRadio,
  onAddDate,
}: ModalProps) {
  const [selectableActive, setSelectableActive] = useState<boolean>(false);
  const [selector, setSelector] = useState<string>("");

  const openSelectableModal = () => {
    setSelectableActive((prev) => !prev);
  };

  const handleCheckboxClick = () => {
    setSelector("checkbox");
    openSelectableModal();
  };

  const handleRadioClick = () => {
    setSelector("radio");
    openSelectableModal();
  }

  return (
    <div className={classes.modal}>
      {!selectableActive ? (
        <div className={classes.modalContent}>
          <h2 className={classes.modalHeader}>Add Input</h2>
          <Button
            onClick={onAddInput}
            className={classes.addButton}
            label="Input"
          />
          <Button
            onClick={handleCheckboxClick}
            className={classes.addButton}
            label="Checkbox"
          />
          <Button
            onClick={handleRadioClick}
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
          <CreateSelectableInputs
            selectablesType = {selector}
            closeSelectableModal={openSelectableModal}
            addSelectableGroup={(selectablesData) => {{selector === "radio" ? (onAddRadio(selectablesData)) : (onAddCheckbox(selectablesData))}
              
              setSelectableActive(false);
            }}
          />
        </div>
      )}
    </div>
  );
}

export default Modal;
