import React, { useState, useEffect } from 'react';
import './Quiz.css';
import { questions as data} from '../../assets/data';

const Quiz = () => {
  const [quizData, setQuizData] = useState([]);
  const [index, setIndex] = useState(0);
  const [lock, setLock] = useState(false);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);


   useEffect(() => {
    const shuffled = [...data].sort(() => Math.random() - 0.5);
    setQuizData(shuffled.slice(0, 10)); // take first 10
  }, []);

  if (quizData.length === 0) return <div>Loading questions...</div>;

  const question = quizData[index];

  const checkAns = (e, ansIndex) => {
    if (lock===false) {
      const options = e.target.parentElement.querySelectorAll('li');
      if (question.answer === ansIndex) {
        e.target.classList.add('correct');
        setLock(true);
        setScore(prev=>prev+1);
      } else {
        e.target.classList.add('wrong');
            const options = document.querySelectorAll('li');
            options[question.answer].classList.add('correct');
      }
      setLock(true);
    }
  };

  const nextQuestion = () => {
    if (lock) {
      const options = document.querySelectorAll('li');
      options.forEach((opt) => {
        opt.classList.remove('correct', 'wrong');
      });

    
      if (index < quizData.length - 1) {
        setIndex(index + 1);
        setLock(false);
      } else {
        setShowResult(true);
      }
    } else {
      alert('⚠️ Please select an answer first!');
    }
  };

  const resetQuiz = () => {
    const shuffled = [...data].sort(() => Math.random() - 0.5);
    setQuizData(shuffled.slice(0, 10));
    setIndex(0);
    setScore(0);
    setLock(false);
    setShowResult(false);
  };


  return (
    <div className="Container">
      <h1>Quiz App</h1>
      <hr />
            {showResult ? (
        <div className="result">
          <h2>🎉 Quiz Completed!</h2>
          <p>
            Your Score: <b>{score}</b> / {quizData.length}
          </p>
          <button onClick={resetQuiz}>Reset Quiz</button>
        </div>
      ) : (
        <>
          <h2>{index + 1}. {question.question}</h2>

      <ul>
        {question.options.map((option, i) => (
          <li key={i} onClick={(e) => checkAns(e, i)}>
            {i + 1}. {option}
          </li>
        ))}
      </ul>

      <button onClick={nextQuestion}>Next</button>

      <div className="index">
        {index + 1} of {quizData.length} questions
      </div>
        </>
      )}
    </div>
  );
};

export default Quiz;
