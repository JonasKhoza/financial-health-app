import { Question } from "../models/Question.model";
  
  const questions: Question[] = [
    // Emergency Fund
    {
      id: 1,
      question: 'How much do you currently have saved in your emergency fund?',
      type: 'slider',
    },
    {
      id: 2,
      question: 'How many months of expenses can your emergency fund cover?',
      type: 'slider',
    },
    {
      id: 3,
      question: 'How much do you contribute to your emergency fund each month?',
      type: 'slider',
    },
  
    // Expense Management
    {
      id: 4,
      question: 'Do you track your monthly expenses? If yes, how?',
      type: 'text',
    },
    {
      id: 5,
      question: 'Do you have a monthly budget? If yes, how often do you stick to it?',
      type: 'multiple-choice',
      options: ['Always', 'Sometimes', 'Rarely'],
    },
    {
      id: 6,
      question: 'What percentage of your income goes towards the following categories: Housing, Utilities, Groceries, Transportation, Entertainment, Miscellaneous?',
      type: 'text',
    },
  
    // Personal Debt
    {
      id: 7,
      question: 'What types of debt do you currently have?',
      type: 'text',
    },
    {
      id: 8,
      question: 'What is the total amount of your debt?',
      type: 'slider',
    },
    {
      id: 9,
      question: 'How much do you pay towards your debt monthly?',
      type: 'slider',
    },
  
    // Insurance
    {
      id: 10,
      question: 'Do you have health insurance? If yes, what type?',
      type: 'text',
    },
    {
      id: 11,
      question: 'How much do you pay in insurance premiums monthly?',
      type: 'slider',
    },
  
    // Retirement Target
    {
      id: 12,
      question: 'Do you have a retirement savings account? If yes, what type?',
      type: 'text',
    },
    {
      id: 13,
      question: 'How much do you currently have saved for retirement?',
      type: 'slider',
    },
    {
      id: 14,
      question: 'How much do you contribute to your retirement savings monthly?',
      type: 'slider',
    },
  
    // Subjective Questions
    {
      id: 15,
      question: 'On a scale of 1 to 10, how confident do you feel about your financial future?',
      type: 'slider',
    },
    {
      id: 16,
      question: 'On a scale of 1 to 10, how stressed are you about your current financial situation?',
      type: 'slider',
    },
  ];
  
  export default questions;
  