import React, { useState } from "react";
import c from "./styles/financial_health_quiz.module.css";
import { Button } from "@mui/material";
import Quiz from "../components/Quiz/Quiz";
import { useNavigate } from "react-router-dom";

const FinancialHealthQuiz: React.FC = () => {
  const [startQuiz, setStartQuiz] = useState(false);
  const [resumeQuiz, setResumeQuiz] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [hasProfile, setHasProfile] = useState(true);
  const [ready, setReady] = useState(false);

  const Navigation = useNavigate();

  // if (query["v"] = "profile"){
  //   setProfile = true;
  // }

  const handleStartQuiz = () => {
    if (!isLoggedIn) {
      return Navigation("/auth?v=signin");
    }

    if (!hasProfile) {
      return Navigation("/profile?set=profile");
    }
    // Redirect to the quiz page or start the quiz
    setStartQuiz(true);
    setResumeQuiz(false);
    setReady(true);
    console.log("Start Quiz");
  };

  const handleResumeQuiz = () => {
    // if (!isLoggedIn) {
    //   return Navigation("/auth?v=signin");
    // }
    // Redirect to the quiz page or resume the quiz
    setResumeQuiz(true);
    setStartQuiz(false);
    setReady(true);
    console.log("Resume Quiz");
  };

  //Move this to an app wide state
  function getQuizData(answers: any) {
    console.log("Submitting answers:", answers);
    //Server processing here

    //
  }

  return (
    <div className={c.financial_health_quiz_container}>
      <div
        className={`${c.welcome_container} ${
          startQuiz || resumeQuiz ? c.disable : ""
        }`}
      >
        <h1>Welcome to Your Financial Health Quiz</h1>
        <p>
          This quiz will help you assess your financial health by evaluating
          various aspects of your financial situation. By answering a few
          questions, you'll receive personalized advice and recommendations to
          improve your financial well-being.
        </p>
        <div className={c.button_container}>
          <Button
            className={c.start_button}
            onClick={handleStartQuiz}
            variant="contained"
          >
            Start Quiz
          </Button>
          <Button
            className={c.resume_button}
            onClick={handleResumeQuiz}
            variant="contained"
          >
            Resume Quiz
          </Button>
        </div>
      </div>
      <div className={`${c.quiz_container} ${ready ? c.open : ""}`}>
        <Quiz getQuizData={getQuizData} />
      </div>
    </div>
  );
};

export default FinancialHealthQuiz;
