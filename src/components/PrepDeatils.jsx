import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const PrepDetails = () => {
  const { topic } = useParams();
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND}/data/prepDetail/${topic}`);
        const data = await response.json();
        const newData = data.topics[0].questions_and_answers;
        console.log(newData);
        setQuestions(newData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchQuestions();
  }, [topic]);

  return (
    <div>
      <style>
        {`
          .prep-container {
            margin: 20px auto;
            max-width: 800px;
            padding: 20px;
          }

          .prep-container h1 {
            text-align: center;
            color: #4a90e2;
            margin-bottom: 30px;
            font-family: Arial, sans-serif;
          }

          .prep-container ul {
            list-style: none;
            padding: 0;
          }

          .prep-container li {
            margin-bottom: 20px;
            padding: 20px;
            background: linear-gradient(135deg, #ffffff, #f0f8ff);
            border: 1px solid #ddd;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }

          .prep-container li:hover {
            transform: scale(1.02);
            box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
          }

          .prep-container .question {
            font-size: 1.2rem;
            font-weight: bold;
            color: #333;
            margin-bottom: 10px;
          }

          .prep-container .answer {
            font-size: 1rem;
            color: #555;
            line-height: 1.5;
          }

          @media (max-width: 600px) {
            .prep-container li {
              padding: 15px;
            }

            .prep-container .question {
              font-size: 1.1rem;
            }

            .prep-container .answer {
              font-size: 0.95rem;
            }
          }
        `}
      </style>
      <>
      <div className="prep-container">
        <h1>{topic} - Interview Questions</h1>
        <ul>
          {questions.map((item, index) => (
            <li key={index}>
              <div className="question">Q {index+1}: {item.question}</div>
              <div className="answer">A: {item.answer}</div>
            </li>
          ))}
        </ul>
      </div>
          </>
    </div>
  );
};

export default PrepDetails;
