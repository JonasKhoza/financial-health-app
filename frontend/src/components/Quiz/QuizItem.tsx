import React, { useState } from "react";
import c from "./styles/quiz.module.css";
import { Question } from "../../models/Question.model";
import { Button } from "@mui/material";

const QuizItem: React.FC<{
  questions: Question[];
  getQuizData: (quiz: any) => void;
}> = ({ questions, getQuizData }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: any }>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    questionId: number
  ) => {
    setAnswers({ ...answers, [questionId]: e.target.value });
  };

  const handleNext = () => {
    if (answers[questions[currentQuestion].id] !== undefined) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    setCurrentQuestion(currentQuestion - 1);
  };

  const handleSubmit = () => {
    if (answers[questions[currentQuestion].id] !== undefined) {
      // Handle form submission here
      getQuizData(answers);
    }
  };

  const question = questions[currentQuestion];
  const isAnswered =
    answers[question.id] !== undefined && answers[question.id] !== "";

  return (
    <>
      <div className={c.question_container}>
        <h2>{question.question}</h2>
        {question.type === "slider" && (
          <input
            type="range"
            min="0"
            max="100"
            value={answers[question.id] || 0}
            onChange={(e) => handleChange(e, question.id)}
          />
        )}
        {question.type === "multiple-choice" && (
          <div className={c.options}>
            {question.options?.map((option, index) => (
              <label key={index} className={c.radio_choices}>
                <input
                  type="radio"
                  name={`question-${question.id}`}
                  value={option}
                  checked={answers[question.id] === option}
                  onChange={(e) => handleChange(e, question.id)}
                />
                {option}
              </label>
            ))}
          </div>
        )}
        {question.type === "currency" && (
          <input
            type="number"
            value={answers[question.id] || ""}
            onChange={(e) => handleChange(e, question.id)}
            placeholder="R"
          />
        )}
        {question.type === "percent" && (
          <input
            type="number"
            value={answers[question.id] || ""}
            onChange={(e) => handleChange(e, question.id)}
            placeholder="Enter percentage"
          />
        )}
      </div>
      <div className={c.navigation}>
        {currentQuestion > 0 && (
          <Button
            variant="contained"
            className={c.nav_button}
            onClick={handlePrevious}
          >
            Previous
          </Button>
        )}
        {currentQuestion < questions.length - 1 ? (
          <Button
            variant="contained"
            className={`${c.nav_button} ${!isAnswered ? c.disabled : ""}`}
            onClick={handleNext}
            disabled={!isAnswered}
          >
            Next
          </Button>
        ) : (
          <Button
            className={c.submit_button}
            onClick={handleSubmit}
            disabled={!isAnswered}
            variant="contained"
          >
            Submit
          </Button>
        )}
      </div>
      <div className={c.progress}>
        Question {currentQuestion + 1} of {questions.length}
      </div>
    </>
  );
};

export default QuizItem;
