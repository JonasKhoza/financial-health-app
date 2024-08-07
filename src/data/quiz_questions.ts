import { Question } from "../models/Question.model";

const questions: Question[] = [
  {
    id: 1,
    question: "Select what best describes your car ownership status:",
    type: "multiple-choice",
    options: [
      "I own a car which I am currently paying off",
      "I own a car, fully paid off",
      "I do not own a car",
    ],
  },
  {
    id: 2,
    question: "How do you feel about your current financial situation?",
    type: "multiple-choice",
    options: [
      "Very Financially Unhealthy",
      "Financially Unhealthy",
      "Somewhat Healthy",
      "Financially Healthy",
      "Financially Thriving",
    ],
  },
  {
    id: 3,
    question:
      "Select what best describes your spending habits over the last year:",
    type: "multiple-choice",
    options: [
      "I spend much less than my income",
      "I spend a little less than my income",
      "I spend about equal to my income",
      "I spend slightly more than my income",
      "I spend much more than my income",
    ],
  },
  {
    id: 4,
    question:
      "How much do you contribute to your home loan or rent each month?",
    type: "currency",
  },
  {
    id: 5,
    question: "Select what best describes your housing situation:",
    type: "multiple-choice",
    options: [
      "I own a home and am paying a bond",
      "I own a home, fully paid off",
      "I am renting",
      "None of the above",
    ],
  },
  {
    id: 6,
    question: "How much do you spend on your vehicle repayments per month?",
    type: "currency",
  },
  {
    id: 7,
    question:
      "On average, how much do you pay towards paying off other debt each month (e.g., credit card repayments, store credit)?",
    type: "currency",
  },
  {
    id: 8,
    question:
      "Budgeting is key to a financially fit future. To help us understand your current constraints, please confirm your total monthly earnings before tax and deductions:",
    type: "currency",
  },
  {
    id: 9,
    question:
      "To further understand your current constraints, please confirm your net monthly earnings after tax and deductions:",
    type: "currency",
  },
  {
    id: 10,
    question: "What insurance cover do you currently have?",
    type: "multiple-choice",
    options: [
      "Health insurance/medical aid",
      "Life cover",
      "Disability cover",
      "Critical illness",
      "Alternative income protection",
      "Funeral policy",
      "Home and buildings",
      "Household contents",
      "Vehicle Insurance",
      "I do not have insurance",
      "Other",
    ],
  },
  {
    id: 11,
    question:
      "Do you feel confident that the insurance policies you have will cover you and your family in the event of theft, an accident, untimely death, injury, illness, or disability?",
    type: "multiple-choice",
    options: [
      "Very confident",
      "Fairly confident",
      "Somewhat confident",
      "Only slightly confident",
      "Not at all confident",
    ],
  },
  {
    id: 12,
    question:
      'How many months worth of savings do you have stored up in an "emergency fund" or savings account?',
    type: "multiple-choice",
    options: [
      "0-3 weeks",
      "1-2 months",
      "3 months",
      "4-5 months",
      "More than 6 months",
    ],
  },
  {
    id: 13,
    question:
      "How much do you contribute to your retirement savings each month?",
    type: "currency",
  },
  {
    id: 14,
    question:
      "How much do you currently have saved (in total) towards your retirement (only include pension funds, provident funds, and retirement annuities)?",
    type: "currency",
  },
  {
    id: 15,
    question: "Do you currently have a signed will?",
    type: "multiple-choice",
    options: ["YES", "NO"],
  },
  {
    id: 16,
    question:
      "What additional support do you need to reach your financial goals?",
    type: "multiple-choice",
    options: [
      "Budgeting",
      "Debt management",
      "Retirement planning",
      "Insurance",
      "Wills and estate planning",
      "Savings and Investments",
      "Other",
    ],
  },
];

export default questions;
