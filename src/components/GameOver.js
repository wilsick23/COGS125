import React, { useContext } from 'react'
import { AppContext} from "../App.js"

function GameOver() {
    const {gameOver, targetWord, currAttempt} = useContext(AppContext);
  return (
    <div className='gameOver'>
      <h3> {gameOver.guessedWord ? "You guessed the word!" : "You failed!"} </h3>
      <h1>Correct: {targetWord}</h1>
      {gameOver.guessedWord && (<h3> You guessed in {currAttempt.attempt} attempts</h3>)}
    </div>
  )
}

export default GameOver
