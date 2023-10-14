import { create } from "zustand";
import {
  ActionResult,
  ActionsVisibility,
  DataFetchArticle,
  LanguageStorage,
  StateResult,
  StateVisibility,
  StateWord,
  answerStorage,
} from "./types";

export const useVisibilityArticle = create<
  StateVisibility & ActionsVisibility
>()((set) => ({
  visibility: false,
  article: "",
  setArticle: (value) => set(() => ({ article: value })),
}));

export const useStorageResult = create<answerStorage>()((set) => ({
  answers: [],
  addAnswer: (answer) => set((state)=> ({ answers: [...state.answers, answer]}))
}));

export const useLanguage = create<LanguageStorage>()((set) => ({
  language: { language: null, visible: true },
  setLanguage: (data) => set(() => ({ language: data })),
}))

export const useActualWord = create<StateWord>()((set) => ({
  word: {
    word: "",
    article: "",
    translation: "",
    articlePicked: "",
  },
  setWord: (data) => set(() => ({ word: data })),
}));

export const useResult = create<StateResult & ActionResult>()((set) => ({
  result: {
    status: null,
    answerPicked: "",
  },
  setResult: (data) => set(() => ({ result: data })),
}));


export const useFetchArticles = create<DataFetchArticle>((set) => ({
  articles: null,
  fetchData: async (setIsLoading, language) => {
    try {
      const response = await fetch("https://tamworth-swift-parrot-gqdq.1.us-1.fl0.io/api/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Set the content type you are sending
        },
        body: JSON.stringify({ language:  language }),
      });
      const data = await response.json();
      set({articles: data.query})
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  },
}));