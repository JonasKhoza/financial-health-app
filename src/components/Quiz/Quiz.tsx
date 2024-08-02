import React, { useState } from 'react';

import questions from '../../data/quiz_questions';
import c from "./styles/quiz.module.css"; 


const Quiz: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: any }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, questionId: number) => {
    setAnswers({ ...answers, [questionId]: e.target.value });
  };

  const handleNext = () => {
    setCurrentQuestion(currentQuestion + 1);
  };

  const handlePrevious = () => {
    setCurrentQuestion(currentQuestion - 1);
  };

  const handleSubmit = () => {
    console.log('Submitting answers:', answers);
    // Handle form submission here
  };

  const question = questions[currentQuestion];

  return (
    <div className={c.quiz_container}>
      <p>Answer the following questions to assess your financial health.</p>
      <div className={c.question_container}>
        <h2>{question.question}</h2>
        {question.type === 'slider' && (
          <input
            type="range"
            min="0"
            max="100"
            value={answers[question.id] || 0}
            onChange={(e) => handleChange(e, question.id)}
          />
        )}
        {question.type === 'multiple-choice' && (
          <div className={c.options}>
            {question.options?.map((option, index) => (
              <label key={index}>
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
        {question.type === 'text' && (
          <input
            type="text"
            value={answers[question.id] || ''}
            onChange={(e) => handleChange(e, question.id)}
          />
        )}
      </div>
      <div className={c.navigation}>
        {currentQuestion > 0 && (
          <button className={c.nav_button} onClick={handlePrevious}>
            Previous
          </button>
        )}
        {currentQuestion < questions.length - 1 ? (
          <button className={c.nav_button} onClick={handleNext}>
            Next
          </button>
        ) : (
          <button className={c.submit_button} onClick={handleSubmit}>
            Submit
          </button>
        )}
      </div>
      <div className={c.progress}>
        Question {currentQuestion + 1} of {questions.length}
      </div>
    </div>
  );
};

export default Quiz;