import { DataFetched } from "../hooks/types";

export const newWord = (articles:DataFetched[]) => {
    const myArticle = Math.floor(Math.random() * articles.length);
    return articles[myArticle].word
}