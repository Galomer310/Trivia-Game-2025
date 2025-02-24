import React, { useEffect, useState } from "react";

interface QuestionProps {
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
  currentQuestionIndex: number;
  totalQuestions: number;
  onAnswer: (selectedAnswer: string) => void;
}

const Question: React.FC<QuestionProps> = ({
  question,
  correct_answer,
  incorrect_answers,
  currentQuestionIndex,
  totalQuestions,
  onAnswer,
}) => {
  const [timer, setTimer] = useState<number>(20); // 10-second countdown
  const [answered, setAnswered] = useState<boolean>(false);
  const [shuffledAnswers, setShuffledAnswers] = useState<string[]>([]);

  // Shuffle answers on question load
  useEffect(() => {
    const answers = [...incorrect_answers, correct_answer];
    setShuffledAnswers(answers.sort(() => Math.random() - 0.5));
  }, [question, correct_answer, incorrect_answers]);

  // Timer countdown effect
  useEffect(() => {
    if (answered) return;
    if (timer === 0) {
      // Auto-submit if timer runs out (pass empty string or handle as timeout)
      onAnswer("");
      return;
    }
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timer, answered, onAnswer]);

  // Reset timer when question changes
  useEffect(() => {
    setTimer(20);
    setAnswered(false);
  }, [question]);

  const handleClick = (answer: string) => {
    if (answered) return;
    setAnswered(true);
    onAnswer(answer);
  };

  // Calculate progress percentage
  const progressPercent = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  return (
    <div className="question-container">
      {/* Progress Bar */}
      <div
        className="progress-bar"
        style={{ width: "100%", background: "#ddd" }}
      >
        <div
          className="progress"
          style={{
            width: `${progressPercent}%`,
            height: "10px",
            background: "#3498db",
            transition: "width 0.5s ease",
          }}
        ></div>
      </div>
      {/* Question with fade-in animation */}
      <h3 dangerouslySetInnerHTML={{ __html: question }} className="fade-in" />
      <div className="timer">Time left: {timer}s</div>
      <ul>
        {shuffledAnswers.map((ans, index) => (
          <li
            key={index}
            onClick={() => handleClick(ans)}
            dangerouslySetInnerHTML={{ __html: ans }}
          ></li>
        ))}
      </ul>
    </div>
  );
};

export default Question;
