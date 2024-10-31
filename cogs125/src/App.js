import './App.css';
import Board from "./components/Board.js";
import Keyboard from "./components/Keyboard.js";
import GameOver from "./components/GameOver.js"
import { createContext, useState, useEffect } from "react";
import { defaultBoard, createWordSet } from "./Words.js";

export const AppContext = createContext();

function App() {
  const [board, setBoard] = useState(defaultBoard);
  const [currAttempt, setCurrAttempt] = useState({attempt: 0, position: 0});
  const [wordSet, setWordSet] = useState(new Set());
  const [disabled, setDisabled] = useState([]);
  const [targetWord, setTargetWord] = useState('');
  const [gameOver, setGameOver] = useState({gameOver: false, guessedCorrect: false})
  const [currTry, setCurrTry] = useState('');

  useEffect(() => {
    createWordSet().then((words) => {
      setWordSet(words.wordSet);
      setTargetWord(words.todaysWord);
    });
  }, []);
  
  const onClickLetter = (keyValue) => {
    if (currAttempt.position > 4) return;

    const newBoard = [...board];
    newBoard[currAttempt.attempt][currAttempt.position] = keyValue;
    setBoard(newBoard);
    setCurrAttempt({...currAttempt, position: currAttempt.position + 1})
  }

  const clickDelete = () => {
    if (currAttempt.position === 0) return;

    const newBoard = [...board];
    newBoard[currAttempt.attempt][currAttempt.position - 1] = '';
    setBoard(newBoard)
    setCurrAttempt({...currAttempt, position: currAttempt.position - 1});
  }

  const clickEnter = () => {
    if (currAttempt.position !== 5) return;
    
    let currWord = ''
    for (let i = 0; i < 5; i++) {
      currWord += board[currAttempt.attempt][i];
    }
    setCurrTry(currWord);

    if (wordSet.has(currWord.toLowerCase())) {
      setCurrAttempt({attempt: currAttempt.attempt + 1, position: 0});

    } else {
      alert("Word Not Found!")
    }

    if (currWord === targetWord) {
      setGameOver({gameOver: true, guessedCorrect: true});
      return;
    }

    if (currAttempt.attempt === 5) {
      setGameOver({gameOver: true, guessedCorrect: false});
      return;
    }
  }
  return (
    <div className="App">
      <nav>
        <h1>Wordle</h1>
        
      </nav>
      <p>For this project, I was inspired to do Wordle on React.</p>
      {/* <CurrTry.Provider value={currWord}>
        <Board />
      </CurrTry.Provider> */}
      <AppContext.Provider value={{ board, setBoard, currAttempt, setCurrAttempt, onClickLetter, clickDelete, clickEnter, targetWord, setDisabled, disabled, setGameOver, gameOver, currTry}}>
        <div className='game'>
          <Board />
          {gameOver.gameOver ? <GameOver /> : <Keyboard />}
        </div>
      </AppContext.Provider>
    </div>
  );
}

export default App;
