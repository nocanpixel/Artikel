import { options } from "../utils/options";
import { motion } from "framer-motion";
import {
  useActualWord,
  useResult,
  useStorageResult,
  useVisibilityArticle,
} from "../hooks/store";
import { newWord } from "../utils/regenerateWord";
import { articles } from "../utils/articles";
import confetti from "canvas-confetti";
import { useState } from "react";

interface TrackerItem {
  key: number;
}

export const Options = () => {
  const { setArticle } = useVisibilityArticle();
  const { word, setWord } = useActualWord();
  const { setResult } = useResult();
  const [disableButton, setDissableButton] = useState(false);
  const { addAnswer, answers } = useStorageResult();
  const [tracker, setTracker] = useState<TrackerItem[]>([]);

  const run = (value: string) => {
    if (disableButton || value === "") return;
    setArticle(value);
  };

  const answerPicked = (element: string, id: number) => {
    if (disableButton) return;
    setArticle(element);
    return evaluateAnswer(element, id);
  };

  const evaluateAnswer = (answerPicked: string, id: number) => {
    const verifyCorrectAnswer = word.article === answerPicked;
    const regenerateWord = newWord();
    const storage = articles?.find(
      (element) => element.word === regenerateWord
    );
    if (verifyCorrectAnswer) {
      setDissableButton(true);
      const confettiSettings = {
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      };
      // Fire the confetti effect
      confetti(confettiSettings);
      setTracker([]);
      if (storage) {
        addAnswer({
          id: answers.length + 1,
          correct: true,
          picked: `${answerPicked} ${word.word}`,
        });
        setTimeout(() => {
          setDissableButton(false);
          setWord({
            word: storage.word,
            article: storage.article,
            translation: storage.translation,
            articlePicked: undefined,
          });
          setArticle("");
        }, 2000);
        setResult({
          status: true,
          answerPicked: `${storage.article} ${storage.word}`,
        });
      }
    } else {
      setTracker((prev) => [...prev, { key: id }]);
      addAnswer({
        id: answers.length + 1,
        correct: false,
        picked: `${answerPicked} ${word.word}`,
      });
      setWord({
        word: word.word,
        article: word.article,
        translation: word.translation,
        articlePicked: answerPicked,
      });
      setArticle(answerPicked);
      setResult({
        status: false,
        answerPicked: `${answerPicked} ${word.word}`,
      });
    }
  };

  return (
    <>
      {options?.map((element) => {
        return (
          <motion.div
            onClick={() => answerPicked(element.value, element.id)}
            onHoverStart={() => run(element.value)}
            onHoverEnd={() => run("")}
            className={`options font-semibold ${tracker?.map((track) =>
              track.key === element.id ? " ring ring-white bg-red-500 text-white " : null
            )} ${disableButton ? "disabled cursor-auto opacity-5" : "block"}`}
            key={element.id}
          >
            {element.value.charAt(0).toUpperCase() + element.value.slice(1)}
          </motion.div>
        );
      })}
    </>
  );
};
