import { InputType } from "./types";

export interface IButton {
  label: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
}

export interface ISelectableSettings {
  closeSelectableModal: () => void;
  addSelectableGroup: (selectableData: {
    question: string;
    options: string[];
  }) => void;
  selectablesType: string;
}

export interface IForm {
  inputs: InputType[];
  title: string;
  isLoading: boolean;
  validationEnabled: boolean;
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
  addOption: (
    i: number,
    newOption: string,
    e: React.MouseEvent<HTMLButtonElement>
  ) => void;
  removeOption: (
    OptionI: number,
    inputI: number,
    e: React.MouseEvent<HTMLButtonElement>
  ) => void;
}

export interface IQuestionnaireProps {
  defaultForm?: { title: string; inputs: InputType[] } | null;
}

export interface DefaultForm {
  title: string;
  inputs: InputType[];
}
