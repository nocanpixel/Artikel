import { useEffect, useState } from "react";
import { articles } from "../utils/articles";
import { useActualWord, useVisibilityArticle } from "../hooks/store";
import { motion } from "framer-motion";
import "../App.css";
import { newWord } from "../utils/regenerateWord";

export const Articles = () => {
  const { article } = useVisibilityArticle();
  const { setWord, word } = useActualWord();
  const [temporalWord, setTemporalWord] = useState('');

  useEffect(() => {
    const storage = articles?.find((element) => element.word === temporalWord);
    if (storage) {
      setWord(storage);
    }
  }, [temporalWord, setWord]);

  // This will recalculate randomArticleIndex whenever articles.length changes
  // eslint-disable-next-line
  useEffect(() => {
    const myArticle = newWord();
    setTemporalWord(myArticle);
  }, []);

  // Generate a unique key based on the 'article' value
  const animationKey = article || "defaultKey";

  return (
    <div className="text-center">
      {" "}
      <motion.span
        key={animationKey}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={``}
      >
        {article === "" ? "???"||word.articlePicked : article}
      </motion.span> {" "}
      {word.word}
    </div>
  );
};