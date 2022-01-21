import { useWeb3React } from "@web3-react/core";
import Head from "next/head";
import Link from "next/link";
import Account from "../../components/Utils/Account";
import Nav from "../../components/Layout/Nav";
import Footer from "../../components/Layout/Footer";
import useEagerConnect from "../../hooks/useEagerConnect";

export default function Home() {
  const { account, library } = useWeb3React();

  const triedToEagerConnect = useEagerConnect();

  const isConnected = typeof account === "string" && !!library;

  return (
    <div>
      <Head>
        <title>Anthromancer - Tokens</title>
        <link rel="icon" href="/favicon.png" />
      </Head>

      <main className="bg-th-background">
        <Nav />

        <div
          id="Tokens"
          className="bg-th-background w-full mt-2 lg:mt-36  text-center justify-center"
        >
          <div className="py-8">
            <p className="text-th-primary-dark decoration-th-accent-light underline font-futura font-medium text-6xl tracking-tighter pt-4 lg:pt-12">
              Tokens
            </p>
          </div>

          <a href="/">Click</a>
          <div className="flex mx-auto">
            <div className="max-w-7xl w-full px-4 lg:px-36 pb-4 flex mx-auto border rounded-lg">
              Yggdrasil
            </div>
          </div>
          <div className="flex mx-auto">
            <div className="max-w-7xl px-4 pb-4 flex mx-auto">
              <div className="text-th-primary-dark  grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-4 gap-x-2.5 pb-4 mt-2">
                <div className="rounded-lg bg-th-accent-light w-64 h-96">
                  Yggdrasil
                </div>
                <div className="rounded-lg bg-th-accent-light w-64 h-96">
                  Yggdrasil
                </div>
                <div className="rounded-lg bg-th-accent-light w-64 h-96">
                  Yggdrasil
                </div>
                <div className="rounded-lg bg-th-accent-light w-64 h-96">
                  Yggdrasil
                </div>
                <div className="rounded-lg bg-th-accent-light w-64 h-96">
                  Yggdrasil
                </div>
              </div>
            </div>
          </div>

          <div className="items-center border mx-4 lg:mx-36 rounded-lg  bg-slate-200 h-136">
            <img
              src="/ProductShot.jpg"
              className="object-cover w-full h-136 object-center rounded-lg  "
            />
          </div>
          <p
            id="secion"
            className="flex mx-auto text-th-primary-dark border text-center font-futura justify-center"
          >
            "All the things"
          </p>
        </div>
      </main>
      <Footer />

      <style jsx>{``}</style>

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
