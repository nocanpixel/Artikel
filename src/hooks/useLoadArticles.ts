import { useEffect, useState } from "react";
import { useFetchArticles } from "./store"
import { useCookies } from "react-cookie";

export const useLoadArticles = () => {
    const [isLoading, setIsLoading] = useState<boolean|null>(null);
    const [cookie] = useCookies();
    const { articles, fetchData } = useFetchArticles();

    useEffect(()=>{
        setIsLoading(true);
        fetchData(setIsLoading,cookie?.language?.language);
    },[cookie])

    return {
        articles,
        isLoading
    }
}