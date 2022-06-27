import React, { useState, useEffect } from 'react';
import Quiz from './Quiz';
import Confetti from 'react-confetti';

export default function App() {
  const amount = 5;
  const [quizData, setQuizData] = useState([]);
  const [dataFetch, setDataFetch] = useState(false);
  const [finish, setFinish] = useState(null);
  const [allSelected, setAllSelected] = useState([]);
  const [correct, setCorrect] = useState(0);
  const [win, setWin] = useState(null);
  const [startScreen, setStartScreen] = useState(true);

  useEffect(() => {
    async function getData() {
      const res = await fetch(`https://opentdb.com/api.php?amount=${amount}`);
      const data = await res.json();
      data.results.forEach((item) => {
        setQuizData((prev) => [
          ...prev,
          {
            question: decode(item.question),
            options: [item.correct_answer, ...item.incorrect_answers]
              .map((item, index) => {
                if (index === 0) {
                  return {
                    value: decode(item),
                    isCorrect: true,
                    isSelected: false,
                  };
                } else {
                  return {
                    value: decode(item),
                    isCorrect: false,
                    isSelected: false,
                  };
                }
              })
              .sort(() => Math.random() - 0.5),
          },
        ]);
      });
    }
    getData();
  }, [dataFetch]);

  function handleSelection(response, targetQuestion) {
    setQuizData((prev) => {
      return prev.map((question) => {
        if (question === targetQuestion) {
          return {
            ...question,
            options: question.options.map((answer) => {
              if (answer === response) {
                return {
                  ...answer,
                  isSelected: true,
                };
              } else {
                return {
                  ...answer,
                  isSelected: false,
                };
              }
            }),
          };
        } else {
          return question;
        }
      });
    });
  }

  function decode(string) {
    const Temp = document.createElement('textarea');
    Temp.innerHTML = string;
    return Temp.textContent;
  }

  function checkSelection() {
    quizData.forEach((item) => {
      item.options.forEach((item) => {
        setAllSelected((prev) => {
          if (item.isSelected) {
            return [...prev, item];
          } else {
            return prev;
          }
        });
      });
    });
    setFinish(true);
  }

  useEffect(() => {
    allSelected.map((item) => {
      setCorrect((prev) => {
        if (item.isCorrect) {
          return prev + 1;
        } else {
          return prev;
        }
      });
    });
  }, [allSelected]);

  useEffect(() => {
    if (correct === amount) {
      setWin(true);
    }
  }, [correct]);

  function reset() {
    setQuizData([]);
    setFinish(null);
    setAllSelected([]);
    setCorrect(0);
    setDataFetch((prev) => !prev);
    setWin(null);
  }

  function startQuiz() {
    setStartScreen(false);
  }

  const questionElements = quizData.map((item, index) => {
    return (
      <Quiz
        key={index}
        item={item}
        question={item.question}
        options={item.options}
        handleSelection={handleSelection}
        finish={finish}
      />
    );
  });

  return (
    <main>
      {startScreen && (
        <div className='startScreen'>
          <h2>Quizzical</h2>
          <button onClick={startQuiz}>Start Quiz</button>
          <small>Made by Santiago Velasquez(Cinemaclub)</small>
        </div>
      )}
      <div className='mainScreen'>
        <h3></h3>
        <ul className='questionsContainer'>{questionElements}</ul>
        {finish && (
          <h3 className='correct'>
            You got <span>{correct}</span> out of {amount} questions correct!
          </h3>
        )}
        {finish ? (
          <button className='main-btn reset-btn' onClick={reset}>
            Play Again
          </button>
        ) : (
          <button className='main-btn check-btn' onClick={checkSelection}>
            Check Answers
          </button>
        )}
        {win && <Confetti />}
      </div>
    </main>
  );
}
