export interface Question {
    id: number;
    question: string;
    type: 'slider' | 'multiple-choice' | 'text';
    options?: string[];
  }