import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { articles } from "../utils/words";

export const useLoadArticles = () => {
    const [isLoading, setIsLoading] = useState<boolean | null>(null);
    const [cookie, setCookie] = useCookies();
    const languagePicked = cookie?.language?.language;

    const myArticles = articles.map((ele) => ({
        word: ele.word,
        article: ele.article,
        translation: ele[languagePicked as 'spanish' | 'english' | 'arabic']
    }));

    useEffect(() => {
        setIsLoading(true);
        !cookie?.language?.visible || cookie?.language.visible && setCookie("language", { language: null, visible: true }, { domain: 'localhost' })
        setIsLoading(false);
    }, [])

    return {
        myArticles,
        isLoading
    }
}