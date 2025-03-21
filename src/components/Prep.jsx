import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Prep = () => {
  const navigate = useNavigate();
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND}/data/prep`, { method: 'GET' });

        if (!response.ok) {
          console.log(response);
          return;
        }

        const data = await response.json();
        setCards(data.topics[0].topics);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCards();
  }, []);

  const getContent = (title) => {
    navigate(`/prepDetail/${title}`);
  };

  return (
    <>
      <style>
        {`
        .card-container {
          display: flex;
          flex-wrap: wrap;
          gap: 20px;
          justify-content: center;
          padding: 20px;
        }

        .card {
          max-height: 699px;
          height: 100%;
          width: 320px;
          border-radius: 12px;
          overflow: hidden;
          background: #fff;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
          transition: transform 0.3s, box-shadow 0.3s;
        }

        .card:hover {
          transform: translateY(-5px);
          box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
        }

        .card-img-top {
          width: 100%;
          height: 200px;
          object-fit: cover;
        }

        .card-body {
          padding: 20px;
          text-align: center;
        }

        .card-title {
          font-size: 1.4rem;
          font-weight: 600;
          color: #333;
          margin-bottom: 10px;
        }

        .card-text {
          font-size: 1rem;
          color: #666;
          margin-bottom: 10px;
        }

        .btn {
          width: 80%;
          padding: 10px;
          font-size: 1rem;
          color: #fff;
          background: #007bff;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: background 0.3s;
        }

        .btn:hover {
          background: #0056b3;
        }

        @media (max-width: 768px) {
          .card {
            width: 90%;
          }

          .btn {
            width: 100%;
          }
        }
      `}
      </style>

      <div className="card-container">
        {cards.map((element, index) => (
          <div className="card" key={index}>
            <img className="card-img-top" src={element.image} alt="Card image cap" />
            <div className="card-body">
              <h5 className="card-title">{element.title}</h5>
              <p className="card-text">{element.description}</p>
              <button className="btn" onClick={() => getContent(element.title)}>
                Prepare
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Prep;
