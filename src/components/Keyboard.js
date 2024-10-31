import React, { useContext, useCallback, useEffect } from 'react';
import { AppContext } from "../App.js";
import Key from "./Key.js"

function Keyboard() {
    const { clickEnter, clickDelete, onClickLetter, currAttempt, disabled, gameOver } = useContext(AppContext);

    const row1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
    const row2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
    const row3 = ["Z", "X", "C", "V", "B", "N", "M"];

    const handleKeyboard = useCallback((event) => {
        if (gameOver.gameOver) return;
        
        if (event.key === 'Enter') {
            clickEnter();
        } else if (event.key === 'Backspace') {
            clickDelete();
        } else {
            row1.forEach((key) => {
                if (event.key.toLowerCase() === key.toLowerCase()) {
                    onClickLetter(key);
                }
            })
            row2.forEach((key) => {
                if (event.key.toLowerCase() === key.toLowerCase()) {
                    onClickLetter(key);
                }
            })
            row3.forEach((key) => {
                if (event.key.toLowerCase() === key.toLowerCase()) {
                    onClickLetter(key);
                }
            })
        }
    }, [currAttempt])

    useEffect(() => {
        document.addEventListener('keydown', handleKeyboard);

        return () => {
            document.removeEventListener('keydown', handleKeyboard);
        };
    }, [handleKeyboard])

    return (
        <div className='keyboard' onKeyDown={handleKeyboard}>
            <div className='row1'>
                {row1.map((key) => {
                    return <Key keyValue={key} isDisabled={disabled.includes(key)}/>
            })}
            </div>
            <div className='row2'>
                {row2.map((key) => {
                    return <Key keyValue={key} isDisabled={disabled.includes(key)}/>
            })}
            </div>
            <div className='row3'>
                <Key keyValue={"ENTER"} bigKey/>
                {row3.map((key) => {
                    return <Key keyValue={key} isDisabled={disabled.includes(key)}/>
            })}
            <Key keyValue={"DELETE"} bigKey/>
            </div>
        </div>
    )
}

export default Keyboard;
