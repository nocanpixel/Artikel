import { useEffect, useState } from "react";
import { useActualWord, useFetchArticles, useVisibilityArticle } from "../hooks/store";
import { motion } from "framer-motion";
import "../App.css";
import { newWord } from "../utils/regenerateWord";

export const Articles = () => {
  const { article } = useVisibilityArticle();
  const { setWord, word } = useActualWord();
  const [temporalWord, setTemporalWord] = useState('');
  const { articles } = useFetchArticles();

  useEffect(() => {
    if(articles){
      const storage = articles?.find((element) => element.word === temporalWord);
      if (storage) {
        setWord(storage);
      }
    }
  }, [temporalWord, setWord, articles]);

  // This will recalculate randomArticleIndex whenever articles.length changes
  // eslint-disable-next-line
  useEffect(() => {
    const myArticle = articles&&newWord(articles);
    myArticle&&setTemporalWord(myArticle);
  }, []);

  // Generate a unique key based on the 'article' value
  const animationKey = article || "defaultKey";

  return (
    <div className="text-center">
      {" "}
      <div className="flex flex-col md:flex-row justify-center gap-3 md:gap-6 ">
      <motion.span
        key={animationKey}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-4xl md:text-7xl"
      >
        {article === "" ? "???" || word.articlePicked: article.charAt(0).toUpperCase()+article.slice(1)}
      </motion.span> {" "}
      <span className="text-4xl md:text-7xl" >{word.word}</span>
      </div>
      <div className="translation text-2xl">
      {`${word.translation}`}
      </div>
    </div>
  );
};