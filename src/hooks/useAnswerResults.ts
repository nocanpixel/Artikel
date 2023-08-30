import { useStorageResult } from "./store";
import { Answer } from "./types";

export const useAnswerResults = () => {
    const { answers } = useStorageResult();

    const incorrectAnswers: { [key: string]: number } = answers
    .filter((answer: Answer) => !answer.correct)
    .reduce((accumulator: { [key: string]: number }, answer: Answer) => {
      if (!accumulator[answer.picked]) {
        accumulator[answer.picked] = 1;
      } else {
        accumulator[answer.picked]++;
      }
      return accumulator;
    }, {});

    const invertedIncorrectAnswers: { [key: string]: number } = Object.keys(incorrectAnswers)
    .reverse()
    .reduce((accumulator: { [key: string]: number }, key: string) => {
      accumulator[key] = incorrectAnswers[key];
      return accumulator;
    }, {});

    const correctAnswers: { [key: string]: number } = answers
    .filter((answer: Answer) => answer.correct)
    .reduce((accumulator: { [key: string]: number }, answer: Answer) => {
      if (!accumulator[answer.picked]) {
        accumulator[answer.picked] = 1;
      } else {
        accumulator[answer.picked]++;
      }
      return accumulator;
    }, {});
  
  const invertedCorrectAnswers: { [key: string]: number } = Object.keys(correctAnswers)
    .reverse()
    .reduce((accumulator: { [key: string]: number }, key: string) => {
      accumulator[key] = correctAnswers[key];
      return accumulator;
    }, {});

    return {
        invertedIncorrectAnswers,
        invertedCorrectAnswers
    }

}