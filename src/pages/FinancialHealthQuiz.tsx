import React, { useState } from 'react';
import c from "./styles/financial_health_.quiz.module.css"
import { Button } from '@mui/material';
import Quiz from '../components/Quiz/Quiz';

const FinancialHealthQuiz: React.FC = () => {
    const [startQuiz, setStartQuiz] = useState(false)
    const [resumeQuiz, setResumeQuiz] = useState(false)


  const handleStartQuiz = () => {
    // Redirect to the quiz page or start the quiz
    setStartQuiz(true)
    setResumeQuiz(false)
    console.log('Start Quiz');
  };

  const handleResumeQuiz = () => {
    // Redirect to the quiz page or resume the quiz
    setResumeQuiz(true)
    setStartQuiz(false)
    console.log('Resume Quiz');
  };

  return (
    <div className={c.financial_health_quiz_container}>
        <div className={c.welcome_container}>
        <h1>Welcome to Your Financial Health Quiz</h1>
      <p>
        This quiz will help you assess your financial health by evaluating various aspects of your financial situation.
        By answering a few questions, you'll receive personalized advice and recommendations to improve your financial well-being.
      </p>
      <div className={c.button_container}>
        <Button className={c.start_button} onClick={handleStartQuiz} variant='contained'>
          Start Quiz
        </Button>
        <Button className={c.resume_button} onClick={handleResumeQuiz} variant='contained'>
          Resume Quiz
        </Button>
      </div>
        </div>
      <div className={resumeQuiz ? c.quiz_container : ""}><Quiz/></div>
    </div>
  );
}

export default FinancialHealthQuiz;
