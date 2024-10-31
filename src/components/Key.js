import React, { useContext } from 'react';
import { AppContext } from "../App.js";

function Key({ keyValue, bigKey, isDisabled }) {
    const { 
        clickDelete, 
        onClickLetter, 
        clickEnter, 
        gameOver} = useContext(AppContext);
    const clickLetter = () => {
        if (gameOver.gameOver) return;
        if (keyValue === 'ENTER') {
            clickEnter();
        } else if (keyValue === 'DELETE') {
            clickDelete();
        } else {
            onClickLetter(keyValue);
        }
    }
  return (
    <div className='key' id={bigKey ? "big" : isDisabled && 'disabled'} onClick={clickLetter}>
        {keyValue}
    </div>
  )
}

export default Key;
