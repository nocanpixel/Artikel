import { useEffect } from "react";
import "./App.css";
import { Articles } from "./components/Articles";
import { Options } from "./components/Options";
import { useResult, useStorageResult } from "./hooks/store";
import { Answer } from "./hooks/types";

function App() {
  const { result, setResult } = useResult();
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
    .reverse() // This will reverse the order of keys
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
    .reverse() // This will reverse the order of keys
    .reduce((accumulator: { [key: string]: number }, key: string) => {
      accumulator[key] = correctAnswers[key];
      return accumulator;
    }, {});

  useEffect(() => {
    document.title = 'Learn German Vocabulary';
    const cleanBg = setTimeout(() => {
      if (result.status === true) {
        setResult({ status: null });
      }
    }, 2000);

    return () => {
      document.title = 'Original Page Title';
      clearTimeout(cleanBg);
    };
  }, [result.status]);

  const output = [
    {
      title: "Corrects",
      value: () =>
        Object.keys(invertedCorrectAnswers).map((answer: string) => (
          <li key={answer}>
            {" "}
            {invertedCorrectAnswers[answer] > 1 ? `${invertedCorrectAnswers[answer]}x ` : ""}
            {answer}
          </li>
        )),
    },
    {
      title: "Incorrects",
      value: () =>
        Object.keys(invertedIncorrectAnswers).map((answer: string) => (
          <li key={answer}>
            {" "}
            {invertedIncorrectAnswers[answer] > 1
              ? `${invertedIncorrectAnswers[answer]}x `
              : ""}
            {answer}
          </li>
        )),
    },
  ];

  console.log(answers);

  return (
    <section
      id="main-app"
      className={`${
        result.status === null
          ? " bg-gray-900"
          : !result.status && result.status !== null
          ? "bg-red-500"
          : "bg-green-500"
      }`}
    >
      <section className="container-app">
        <div>
          <div className="relative h-10 flex items-center">
            <span className="absolute right-0 bg-white px-4 py-1 rounded-full text-gray-900">
              {"Die Artikel"}
            </span>
          </div>
        </div>
        <section>
          <div className="mt-20">
            <span className="title text-8xl font-semibold">
              <Articles />
            </span>
            <div className="flex flex-col md:flex-row justify-center  gap-4 mt-10">
              <Options />
            </div>
            <div className="p-4 flex justify-center">
              <div className="overflow-hidden w-3/4 mt-10">
                <div className="grid grid-cols-2 gap-4 text-gray-900">
                  {output?.map((value, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-lg p-4 shadow-md"
                    >
                      <span className="font-bold text-lg">{value.title}</span>
                      <div className="h-44 max-h-full overflow-auto">
                        <ul>{value.value()}</ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </section>
    </section>
  );
}

export default App;
