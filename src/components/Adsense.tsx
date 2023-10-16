import { useEffect } from "react";

export const Adsense = () => {
    useEffect(() => {
        const pushAd = () => {
          try {
            //@ts-ignore
            const adsbygoogle = window.adsbygoogle
            console.log({ adsbygoogle })
            adsbygoogle.push({})
          } catch (e) {
            console.error(e)
          }
        }
    
        let interval = setInterval(() => {
          // Check if Adsense script is loaded every 300ms
          //@ts-ignore
          if (window.adsbygoogle) {
            pushAd()
            // clear the interval once the ad is pushed so that function isn't called indefinitely
            clearInterval(interval)
          }
        }, 300)
    
        return () => {
          clearInterval(interval)
        }
      }, [])
  return (
    <>
      <ins
        className="adsbygoogle"
        style={{ display: "inline-block",width:'728px',height:'90px' }}
        data-ad-client="ca-pub-5326726221343916"
        data-ad-slot="9982017010"
        data-full-width-responsive="true"
      ></ins>
    </>
  );
};
