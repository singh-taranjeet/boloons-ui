export type ValuesType = Array<{
  value: number | string;
}>;

export enum EnumOperations {
  ADD,
  SUB,
  MUL,
  DIV,
}

export interface QuestionType {
  equation: EquationType[];
  omittedPosition: number;
}
export interface EquationType {
  value: number;
  color?: string;
  id: number;
}
