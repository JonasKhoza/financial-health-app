export interface Question {
  id: number;
  question: string;
  type: "slider" | "multiple-choice" | "text" | "currency" | "percent";
  options?: string[];
}
