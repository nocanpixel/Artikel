import { useEffect } from "react";
import "./App.css";
import { Articles } from "./components/Articles";
import { Options } from "./components/Options";
import { useLanguage, useResult } from "./hooks/store";
import Language from "./components/Language";
import { useCookies } from "react-cookie";
import { useLoadArticles } from "./hooks/useLoadArticles";
import { Skeleton } from "./components/Skeleton";

function App() {
  const { result, setResult } = useResult();
  const { isLoading, } = useLoadArticles();
  const [ cookie, setCookie] = useCookies(["language"]);
  const { setLanguage } = useLanguage();

  useEffect(() => {
    const cleanBg = setTimeout(() => {
      if (result.status === true) {
        setResult({ status: null });
      }
    }, 2000);

    return () => {
      clearTimeout(cleanBg);
    };
  }, [result.status]);

  const handleRemove = () => {
    setLanguage({language: null, visible: true});
    setCookie("language", {language: null, visible: true}, { path: "/" });
  };


  return (
    <section
      id="main-app"
      className={`${
        result.status === null
          ? " bg-gray-900 relative"
          : !result.status && result.status !== null
          ? "bg-red-500"
          : "bg-green-500"
      }`}
    >
      <section className="container-app px-4 md:px-20">
        {Object.keys(cookie).length === 0 || cookie.language.visible && <Language />}
        <div className="absolute top-7 w-full left-0 flex justify-between items-center px-4 md:px-20 z-10">
          <span className="text-white text-md font-sans font-extrabold text-3xl">
            {"Developer"}
          </span>
          <span
            onClick={handleRemove}
            className="bg-white p-2 rounded-full hover:scale-125 transition-transform cursor-pointer "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 text-gray-950"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 01-3.827-5.802"
              />
            </svg>
          </span>
        </div>
        <section>
          <div>
            <section className="h-screen flex flex-col justify-center gap-8 relative">
              <span className="title text-6xl md:text-8xl font-semibold">
                {isLoading ? (
                  <>
                    <Skeleton className={"w-96 "} />
                    <Skeleton className={"w-60 mt-2"} />
                  </>
                ) : (
                  <Articles />
                )}
              </span>
              <div className="flex flex-col md:flex-row justify-center  gap-4">
                <Options disabled={isLoading} />
              </div>
              <div className=" absolute bottom-10 w-full flex justify-center text-sm text-gray-200">
                {"Camilo Carreño "}&copy;{" 2023"}
              </div>
            </section>
            {/* <div className="md:p-4 flex justify-center">
              <div className="overflow-hidden w-full md:w-3/4 mt-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-900">
                  {output?.map((value, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-lg p-4 shadow-md"
                    >
                      <span className="font-bold text-xl">{value.title}</span>
                      <div className="h-44 max-h-full overflow-auto mt-3">
                        <ul>{value.value()}</ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div> */}
          </div>
        </section>
      </section>
    </section>
  );
}

export default App;
