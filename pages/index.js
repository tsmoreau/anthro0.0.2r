import { verifyMessage } from "@ethersproject/wallet";
import { useWeb3React } from "@web3-react/core";
import Head from "next/head";
import Link from "next/link";
import Account from "../components/Utils/Account";
import Nav from "../components/Layout/Nav";
import Footer from "../components/Layout/Footer";

import ETHBalance from "../components/Utils/ETHBalance";
import useEagerConnect from "../hooks/useEagerConnect";
import usePersonalSign, { hexlify } from "../hooks/usePersonalSign";
import ScrollAnimation from "react-animate-on-scroll";

export default function Home() {
  const { account, library } = useWeb3React();

  const triedToEagerConnect = useEagerConnect();

  const sign = usePersonalSign();

  const handleSign = async () => {
    const msg = "Whitelisted for Anthropos";
    const sig = await sign(msg);
    console.log(sig);
    console.log("isValid", verifyMessage(msg, sig) === account);
  };

  const isConnected = typeof account === "string" && !!library;

  return (
    <div className="bg-black h-full ">
      <Head>
        <title>Anthromancer - Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="">
        <Nav />
        <div className="bg-th-background w-full py-2 lg:py-8  text-center justify-center">
          <div className="border mx-4 lg:mx-12 rounded-lg  bg-slate-200 h-136">
            TS
          </div>
        </div>
        <div className="text-center items-center justify-center flex mx-auto text-primary-dark text-4xl  flex mx-auto bg-th-background">
          Some Text
        </div>

        <Footer />
      </div>

      <style jsx>{`
        nav {
        }

        main {
        }
      `}</style>

      <style jsx global>{`
        body {
          margin: 0;
        }

        html {
          font-family: sans-serif, Apple Color Emoji, Segoe UI Emoji,
            Segoe UI Symbol, Noto Color Emoji;
          line-height: 1.5;
        }

        *,
        *::after,
        *::before {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}
