import { useWeb3React } from "@web3-react/core";
import Head from "next/head";
import Link from "next/link";
import Account from "../../../components/Utils/Account";
import Nav from "../../../components/Layout/Nav";
import Footer from "../../../components/Layout/Footer";
import useEagerConnect from "../../../hooks/useEagerConnect";

export default function Home() {
  const { account, library } = useWeb3React();

  const triedToEagerConnect = useEagerConnect();

  const isConnected = typeof account === "string" && !!library;

  return (
    <div>
      <Head>
        <title>Anthromancer - Anthropos</title>
        <link rel="icon" href="/favicon.png" />
      </Head>

      <main className="bg-th-background text-white">
        <Nav />
        <div className="py-4 w-full text-center">
          <p className="underline  font-anthro text-th-primary-dark text-6xl pt-32 mb-6  decoration-th-accent-light">
            ANTHROPOS
          </p>
          <p className=" text-th-primary-dark italic font-futura text-lg pt-8 pb-6">
            "Insightful quote/Structured abstraction"
          </p>
        </div>
        <img
          src="/anth4.svg"
          className="flex mx-auto w-5/6 lg:w-1/2  rounded-xl mb-10"
        />
        <div className="mb-10 w-full ">
          <div className="font-futura flex mx-auto my-4 max-w-5xl grid grid-cols-2 xl:grid-cols-4  gap-2 lg:gap-4 px-10">
            <div className="border border-gray-400 border-double border-4  transition ease-in-out hover:-translate-y-3 hover:-rotate-3  italic rounded-lg h-64 w-40 lg:h-80 lg:w-56 flex mx-auto bg-th-accent-light">
              <div className=" bg-white bg-opacity-10 h-64 font-futura items-center  text-center  flex my-auto px-6 text-base lg:text-3xl ">
                Free To Mint Human Blueprints.
              </div>
            </div>

            <div className="border border-gray-400 border-double border-4  transition ease-in-out hover:-translate-y-3 hover:-rotate-2 italic rounded-lg h-64 w-40 lg:h-80 lg:w-56 flex mx-auto bg-th-accent-light">
              <div className="bg-white bg-opacity-10 h-64 font-futura items-center  text-center flex my-auto px-6 text-base lg:text-3xl ">
                Birthed From Randomness.
              </div>
            </div>

            <div className="border border-gray-400 border-double border-4 transition ease-in-out hover:-translate-y-3 hover:rotate-2   italic rounded-lg h-64 w-40 lg:h-80 lg:w-56 flex mx-auto bg-th-accent-light">
              <div className="bg-white bg-opacity-10 h-64 font-futura items-center text-center flex my-auto px-6 text-base lg:text-3xl ">
                Open Ended, Built For Community Expansion.
              </div>
            </div>
            <div className="border border-gray-400 border-double border-4 transition ease-in-out hover:-translate-y-3 hover:rotate-3   italic rounded-lg h-64 w-40 lg:h-80 lg:w-56 flex mx-auto bg-th-accent-light">
              <div className="bg-white bg-opacity-10 h-64 font-futura items-center  text-center flex my-auto px-6 text-base lg:text-3xl ">
                Character Seed For Anthromancer Game Projects.
              </div>
            </div>
          </div>
        </div>

        <div className="items-center text-xl py-2 my-1 flex mx-auto justify-center w-116 max-w-full font-futura text-white px-6 py-1  border bg-th-accent-light rounded  border-th-primary-dark ">
          1893 / 7777 Anthropos Tokens Minted
        </div>
        <div className="items-center text-xl py-2 my-1 flex mx-auto justify-center w-116 max-w-full font-futura text-white px-6 py-1  border bg-th-accent-light rounded  border-th-primary-dark ">
          You Own 2 (of 3 Max) Anthropos Tokens
        </div>
        <div className="items-center text-xl py-2 my-1 cursor-pointer  flex mx-auto justify-center w-116 max-w-full font-futura text-white px-6 py-1  border bg-th-accent-light rounded border-th-primary-dark ">
          View All Anthropos Tokens Minted
        </div>
        <div className="animate-pulse animate-animated animate-repeat-10 items-center text-3xl  mt-6 cursor-pointer py-3 flex mx-auto justify-center w-80 font-futura text-white px-4 py-1  border bg-th-accent-light border-th-primary-dark ">
          Mint Anthropos Token
        </div>
        <div className="h-20 w-full"></div>
      </main>
      <Footer />

      <style jsx>{`
        #title {
          font-family: Futura;
        }

        @font-face {
          font-family: Futura;
          src: url(/fonts/futura-pt-book.otf);
        }
        @font-face {
          font-family: Anthro;
          src: url(/fonts/AnthromancerRegular2.otf);
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
