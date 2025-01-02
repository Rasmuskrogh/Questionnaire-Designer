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
  | { type: "radio"; question: string; options: string[] } // För radioknappar
  | { label: string; input: string } // För vanliga textfält
  | { checkbox: boolean; input: string } // För checkboxar
  | { date: string; input: string; label: string };
