import { InputType } from "./types";

export interface IButton {
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
}

export interface RadioButtonSettingsProps {
  closeRadio: () => void;
  addRadioGroup: (radioData: { question: string; options: string[] }) => void;
}

export interface IForm {
  inputs: InputType[];
}
