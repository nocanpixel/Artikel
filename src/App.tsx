import { useEffect } from "react";
import "./App.css";
import { Articles } from "./components/Articles";
import { Options } from "./components/Options";
import { useResult } from "./hooks/store";
import { useOutput } from "./hooks/useOutput";

function App() {
  const { result, setResult } = useResult();
  const output = useOutput();

 
  useEffect(() => {
    const cleanBg = setTimeout(() => {
      if (result.status === true) {
        setResult({ status: null });
      }
    }, 2500);

    return () => {
      clearTimeout(cleanBg);
    };
  }, [result.status]);

  return (
    <section
      id="main-app"
      className={`${
        result.status === null
          ? " bg-gray-900"
          : !result.status && result.status !== null
          ? "bg-red-500"
          : "bg-green-500"
      }`}
    >
      <section className="container-app">
        <div>
          <div className="relative h-10 flex items-center">
            <span className="absolute right-0 bg-white px-4 py-1 rounded-full text-gray-900">
              {"Die Artikel"}
            </span>
          </div>
        </div>
        <section>
          <div className="mt-20">
            <span className="title text-8xl font-semibold">
              <Articles />
            </span>
            <div className="flex flex-col md:flex-row justify-center  gap-4 mt-10">
              <Options />
            </div>
            <div className="md:p-4 flex justify-center">
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
            </div>
          </div>
        </section>
      </section>
    </section>
  );
}

export default App;
