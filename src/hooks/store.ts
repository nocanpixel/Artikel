import { create } from "zustand";
import {
  ActionResult,
  ActionsVisibility,
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
