export interface StateVisibility {
  article: string;
}

export interface ActionsVisibility {
  setArticle: (value: string) => void;
}

export interface StateWord {
  word: {
    word: string;
    article: string;
    translation: string;
    articlePicked?: string;
  };
  setWord: (data: {
    word: string;
    article: string;
    translation: string;
    articlePicked?: string;
  }) => void;
}

export interface StateResult {
  result: {
    status?: boolean | null;
    answerPicked?: string;
  };
}

export interface ActionResult {
  setResult: (data: { status?: boolean | null; answerPicked?: string }) => void;
}


export interface Answer {
    id: number;
    correct: boolean;
    picked: string;
}

export interface answerStorage {
    answers: Answer[];
    addAnswer: (answer:Answer) => void;
}

export interface Answer {
  correct: boolean;
  picked: string;
}

export interface PropsLanguage {
  
}

type Language = {
  language: string | null;
  visible: boolean;
}

export interface LanguageStorage {
  language: Language;
  setLanguage: (data: Language) => void;
}

export interface DataFetched {
  word: string;
  article: string;
  translation: string;
}

export interface DataFetchArticle {
  articles: DataFetched[] | null;
  fetchData: (setIsLoading:(loading:boolean)=>void, language:string|null) => Promise<void>;
}