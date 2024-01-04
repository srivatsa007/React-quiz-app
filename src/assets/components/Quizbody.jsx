import { useState } from "react";

const QuizBox = ({ data, clickHandler, endQuiz }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentQuestion = data[currentIndex];
  const [question, setQuestion] = useState(1);

  const handleNext = () => {
    if (currentIndex < data.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setQuestion(question + 1);
    } else {
      endQuiz();
    }
  };

  const handleCorrect = () => {
    if (currentIndex === 10) {
      endQuiz();
    } else {
      clickHandler();
      handleNext();
    }
  };
  const handleIncorrect = () => {
    if (currentIndex === 10) {
      endQuiz();
    } else {
      handleNext();
    }
  };
  const skipHandler = () => {
    if (currentIndex === 10) {
      endQuiz();
    } else {
      handleNext();
    }
  };
  if (!currentQuestion) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-fit">
      <div key={currentIndex}>
        <div className="bg-white py-10 text-center px-3 border rounded-xl w-[400px] h-[180px] font-semibold shadow-lg mt-24 mb-10">
          <p className="mb-3">Question {question}</p>
          {currentQuestion.question}
        </div>
        <div className="flex flex-col">
          {currentQuestion.incorrect_answers.map((option, optionIndex) => (
            <button
              onClick={handleIncorrect}
              className="w-[400px] bg-white py-3 my-2 border shadow-md hover:bg-[#ABD1C6] duration-300 rounded-3xl "
              key={optionIndex}
            >
              {option}
            </button>
          ))}
          <button
            onClick={handleCorrect}
            className="bg-white py-3 my-2 border shadow-md hover:bg-[#ABD1C6] duration-300 rounded-3xl"
          >
            {currentQuestion.correct_answer}
          </button>
        </div>
        <div className="flex justify-between">
          <button
            className="px-3 py-2 mt-5 duration-300 bg-white border rounded-lg shadow-md hover:bg-blue-300"
            onClick={skipHandler}
          >
            Skip Question
          </button>
          <button
            className="px-3 py-2 mt-5 duration-300 bg-white border rounded-lg shadow-md hover:bg-red-300"
            onClick={endQuiz}
          >
            End Quiz
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizBox;