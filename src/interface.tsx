import { InputType } from "./types";

export interface IButton {
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
}

export interface IRadioButtonSettings {
  closeRadio: () => void;
  addRadioGroup: (radioData: { question: string; options: string[] }) => void;
}

export interface IForm {
  inputs: InputType[];
  title: string;
}

export interface ITitleInput {
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
}

export interface IInputWrapper {
  input: InputType;
  index: number;
  handleChange: (
    i: number,
    field: "label" | "input" | "checkbox" | "date" | "options" | "question",
    vaule: string | boolean | string[]
  ) => void;
  arrowUpClicked: (i: number) => void;
  arrowDownClicked: (i: number) => void;
  deleteInput: (i: number) => void;
  inputsLength: number;
}
