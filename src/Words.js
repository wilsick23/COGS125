import wordBank from './word-database.txt'

export const defaultBoard = [
    ["","","","",""],
    ["","","","",""],
    ["","","","",""],
    ["","","","",""],
    ["","","","",""],
    ["","","","",""]
];

export const createWordSet = async () => {
    let wordSet;
    let todaysWord;
    await fetch(wordBank)
        .then((response) => response.text())
        .then((result) => {
            const wordArr = result.split('\r\n')
            todaysWord = wordArr[Math.floor(Math.random() * wordArr.length)]
            wordSet = new Set(wordArr);
        });
    return {wordSet, todaysWord};
};