import { useAnswerResults } from './useAnswerResults';

export const useOutput = () => {
  const { invertedCorrectAnswers, invertedIncorrectAnswers } = useAnswerResults();

  const output = [
    {
      title: 'Corrects',
      value: () =>
        Object.keys(invertedCorrectAnswers).map((answer: string) => (
          <li className='text-gray-600 font-light text-sm' key={answer}>
            {invertedCorrectAnswers[answer] > 1 ? `${invertedCorrectAnswers[answer]}x ` : ''}
            {answer}
          </li>
        )),
    },
    {
      title: 'Incorrects',
      value: () =>
        Object.keys(invertedIncorrectAnswers).map((answer: string) => (
          <li className='text-gray-600 font-light text-sm' key={answer}>
            {invertedIncorrectAnswers[answer] > 1 ? `${invertedIncorrectAnswers[answer]}x ` : ''}
            {answer}
          </li>
        )),
    },
  ];

  return output;
};