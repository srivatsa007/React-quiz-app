import  { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import QuizBox from "./assets/components/Quizbody";

function App() {
  const [data, setData] = useState([]);
  const [correct, setCorrect] = useState(0);
  const [endQuiz, SetEndQuiz] = useState(false);

  const quizEnded = () => {
    SetEndQuiz(true);
  };

  const correctHandler = () => {
    setCorrect(correct + 1);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://opentdb.com/api.php?amount=10&type=multiple"
        );
        const data = response.data.results;
        setData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <div className="flex justify-center">
      <div>
        {endQuiz ? (
          <>
            <h2 className="text-[32px] text-center mt-40 ">Quiz Ended !</h2>
            <p className=" text-[46px] mt-10 font-semibold text-center">
              Score :{correct}/10
            </p>
          </>
        ) : (
          <>
            <QuizBox
              data={data}
              clickHandler={correctHandler}
              endQuiz={quizEnded}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default App;