import React, { useContext, useEffect } from 'react';
import { AppContext } from "../App.js";

function Letter({ position, attempt }) {
    const { board, targetWord, currAttempt, setDisabled, currTry } = useContext(AppContext);
    const letter = board[attempt][position];
    const targetArr = targetWord.split('');
    const tryArr = currTry.split('');
    let letterCount = {}
    let guessedCount = {}
    let correctLetter = [0, 0, 0, 0, 0]

    for (let char of targetWord) {
        if (letterCount[char]){
            letterCount[char] += 1
        } else {
            letterCount[char] = 1;
        }
    }


    for (let char of currTry) {
        if (guessedCount[char]){
            guessedCount[char] += 1
        } else {
            guessedCount[char] = 1;
        }
    }

    for (let i=0; i<tryArr.length; i++) {
        if (tryArr[i].toLowerCase() !== targetArr[i]) {
            targetArr[i] = ''
        }
    };

    let greenTarget = letterCount;
    for (let char of targetArr) {
        if (char in greenTarget) {
            greenTarget[char] -= 1
        }
    }

    for (let i=0; i<tryArr.length; i++) {
        if (tryArr[i] === targetArr[i]) {
            correctLetter[i] = 1;
        }
    };

    const correct = targetWord.toUpperCase()[position] === letter;
    const almost = !correct && letter !== '' && targetWord.toUpperCase().includes(letter) && (guessedCount[letter] > letterCount[letter]) && greenTarget[letter] > 0
    const alsoAlmost = !correct && letter !== '' && targetWord.toUpperCase().includes(letter) && greenTarget[letter.toLowerCase()] > 0;
    const state = 
        currAttempt.attempt > attempt &&
        (correct ? 'correct' : almost ? 'almost' : alsoAlmost ? 'almost' : 'error');

        useEffect(() => {
            if (letter !== '' && !correct && !almost && !alsoAlmost ) {
                setDisabled((previous) => [...previous, letter]);
            }
        }, [currAttempt.attempt]);

    return <div className="letter" id={state}>{letter}</div>;
}

export default Letter;
