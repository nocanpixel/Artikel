import { useLanguage } from "../hooks/store";
import { flags } from "../utils/flags";
import { useCookies } from "react-cookie";

function Language() {

    const { setLanguage } = useLanguage();
    const [, setCookie] = useCookies();

    interface Flag {
        language: string;
    }

    const handleFlag = ( flag:Flag ) => {
        setLanguage({language: flag.language, visible: false});
        setCookie('language', {language: flag.language, visible: false}, {domain:'localhost'});
    }
  
  return (
    <div className="absolute z-50 left-0 top-0 w-full bg-black h-screen py-16 md:py-20 flex justify-center">
      <div className=" w-full mx-5 md:w-1/2 bg-white h-full rounded-md p-6">
        <section className="header py-4">
          <h1 className="text-black text-4xl font-bold">
            Language preference.
          </h1>
          <p className="text-gray-600 text-sm mt-2">
            Choose your preferred language for this application. Your language
            preference will customize the user interface and content to enhance
            your experience.
          </p>
        </section>
        <section className="grid grid-cols-1 gap-5 md:gap-6 md:grid-cols-3 h-48 md:grid-rows-2 text-black mt-10 md:mt-14 place-items-center sm:w-full xl:w-3/5 mx-auto">
          {flags.map((flag) => (
            <div onClick={()=> handleFlag(flag)} key={flag.id} className={`${flag.class} hover:scale-110 md:hover:scale-125 hover:ring-2 hover:p-2 hover:ring-green-400 hover:rounded-md cursor-pointer transition-transform flex flex-col items-center gap-2 group shadow-md`}>
              <img
                src={flag.url}
                alt="Colombia"
                className="rounded-md w-24 sm:w-32 md:w-40 shadow-md"
              />
              <span
                className=" text-md md:text-md text-gray-600 font-bold hidden group-hover:block  "
                id="col"
              >
                {flag.language.charAt(0).toUpperCase()+flag.language.slice(1)}
              </span>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}

export default Language;
