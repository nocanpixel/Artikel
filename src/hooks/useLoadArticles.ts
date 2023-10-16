import { useEffect, useState } from "react";
import { useFetchArticles } from "./store"
import { useCookies } from "react-cookie";

export const useLoadArticles = () => {
    const [isLoading, setIsLoading] = useState<boolean|null>(null);
    const [cookie, setCookie] = useCookies();
    const { articles, fetchData } = useFetchArticles();

    useEffect(()=>{
        setIsLoading(true);
        !cookie?.language?.visible||cookie?.language.visible?fetchData(setIsLoading,cookie?.language?.language):setCookie("language", {language:null, visible:true}, {domain:'cambe.app'});
    },[cookie])

    return {
        articles,
        isLoading
    }
}