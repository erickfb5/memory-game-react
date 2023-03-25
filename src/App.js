import { useState, useEffect } from "react";

import "./App.css";

const App = () => {
  const [order, setOrder] = useState([]);
  const [clickedOrder, setClickedOrder] = useState([]);
  const [score, setScore] = useState(0);

  useEffect(() => {
    playGame();
  }, []);

  const shuffleOrder = () => {
    const colorOrder = Math.floor(Math.random() * 4);
    setOrder((prevOrder) => [...prevOrder, colorOrder]);
    setClickedOrder([]);
    for (let i in order) {
      const elementColor = createColorElement(order[i]);
      lightColor(elementColor, Number(i) + 1);
    }
  };

  const lightColor = (element, number) => {
    number = number * 500;
    setTimeout(() => {
      element.classList.add("selected");
    }, number - 250);
    setTimeout(() => {
      element.classList.remove("selected");
    });
  };

  const checkOrder = () => {
    for (let i in clickedOrder) {
      if (clickedOrder[i] !== order[i]) {
        gameOver();
        return;
      }
    }

    if (clickedOrder.length === order.length) {
      alert(`Score: ${score}\nWell done! Next level...`);
      nextLevel();
    }
  };

  const click = (color) => {
    setClickedOrder((prevClickedOrder) => [...prevClickedOrder, color]);
    createColorElement(color).classList.add("selected");
    setTimeout(() => {
      createColorElement(color).classList.remove("selected");
      checkOrder();
    }, 250);
  };

  const createColorElement = (color) => {
    switch (color) {
      case 0:
        return document.querySelector(".green");
      case 1:
        return document.querySelector(".red");
      case 2:
        return document.querySelector(".yellow");
      case 3:
        return document.querySelector(".blue");
      default:
        return null;
    }
  };

  const nextLevel = () => {
    setScore((prevScore) => prevScore + 1);
    shuffleOrder();
  };

  const gameOver = () => {
    alert(`Score: ${score}!\nYou lose!\nClick OK to start a new game.`);
    setOrder([]);
    setClickedOrder([]);
    setScore(0);
    playGame();
  };

  const playGame = () => {
    alert("Welcome! Are you up for the challenge?");
    setScore(0);
    nextLevel();
  };

  return (
    <div className="main-game">
      <div className="genius">
        <div className="green" onClick={() => click(0)}></div>
        <div className="red" onClick={() => click(1)}></div>
        <div className="yellow" onClick={() => click(2)}></div>
        <div className="blue" onClick={() => click(3)}></div>
      </div>
    </div>
  );
};

export default App;
