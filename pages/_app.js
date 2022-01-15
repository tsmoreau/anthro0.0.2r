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
      </Web3ReactProvider>
    </ThemeProvider>
  );
}
