import "../styles/globals.css";
import "tailwindcss/tailwind.css";

import { ThemeProvider } from "next-themes";
import { Web3Provider } from "@ethersproject/providers";
import { Web3ReactProvider } from "@web3-react/core";

function getLibrary(provider) {
  return new Web3Provider(provider);
}

export default function NextWeb3App({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <Web3ReactProvider getLibrary={getLibrary}>
        <Component {...pageProps} />
        <style jsx>{`
           {


          
          @font-face {
            font-family: Futura;
            src: url(/fonts/futura-pt-book.otf);
          }
          @font-face {
            font-family: Anthro;
            src: url(/fonts/AnthromancerRegular2.otf);
          

            @import url("https://use.typekit.net/pcf5uvh.css");
      
            
          }
        `}</style>
      </Web3ReactProvider>
    </ThemeProvider>
  );
}
