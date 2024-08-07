import questions from "../../data/quiz_questions";
import QuizItem from "./QuizItem";
import c from "./styles/quiz.module.css";

const Quiz: React.FC<{ getQuizData: (quiz: any) => void }> = ({
  getQuizData,
}) => {
  return (
    <div className={c.quiz_container}>
      <p>Answer the following questions to assess your financial health.</p>
      <QuizItem questions={questions} getQuizData={getQuizData} />
    </div>
  );
};

export default Quiz;
