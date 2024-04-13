import { useCallback, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { articles } from "../utils/words";

export const useLoadArticles = () => {
    const [isLoading, setIsLoading] = useState<boolean | null>(null);
    const [cookie, setCookie] = useCookies();
    const languagePicked = cookie?.language?.language;
    const [myArticles, setMyArticles] = useState<({ word: string; article: string; translation: string; })[]>();

    const checkCookie = useCallback(()=>{
        !languagePicked && setCookie("language", { language: null, visible: true }, { domain: 'localhost' })
    },[languagePicked])

    useEffect(() => {
        checkCookie();
        setIsLoading(false);
        const format = articles.map((ele) => ({
            word: ele.word,
            article: ele.article,
            translation: ele[languagePicked as 'spanish' | 'english' | 'arabic']
        }))
        setMyArticles(format)
    }, [languagePicked])

    return {
        myArticles,
        isLoading
    }
}