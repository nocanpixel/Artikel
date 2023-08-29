import { articles } from "./articles";

export const newWord = () => {
    const myArticle = Math.floor(Math.random() * articles.length);
    return articles[myArticle].word
}