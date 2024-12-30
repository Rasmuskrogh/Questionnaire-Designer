export type InputFieldProps = {
  input: { label?: string; input: string; checkbox?: boolean };
  index: number;
  onChange: (
    index: number,
    field: "label" | "input" | "checkbox" | "date",
    value: string | boolean
  ) => void;
};

export type ModalProps = {
  onClose: () => void;
  onAddInput: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onAddCheckbox: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onAddDate: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onAddRadio: (radioData: { question: string; options: string[] }) => void;
};

export type InputType =
  | { label: string; input: string }
  | { checkbox: boolean; input: string }
  | { type: "radio"; question: string; options: string[] }
  | { input: string; date: string };
