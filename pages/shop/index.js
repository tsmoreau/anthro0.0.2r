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
        <title>Anthromancer - Shop</title>
        <link rel="icon" href="/favicon.png" />
      </Head>

      <main className="bg-th-background">
        <Nav />

        <div
          id="shop"
          className="bg-th-background w-full mt-2 lg:mt-36  text-center justify-center"
        >
          <div className="py-8">
            <p className="text-th-primary-dark decoration-th-accent-light underline font-anthro font-medium text-6xl tracking-tighter pt-4 lg:pt-12">
              SHOP
            </p>
          </div>
          <div className="w-full h-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-4 gap-x-2">
            <div className="max-w-sm w-full h-136 bg-lime-300">TEST!</div>
            <div className="max-w-sm w-full h-136 bg-lime-300">TEST!</div>
            <div className="max-w-sm w-full h-136 bg-lime-300">TEST!</div>
            <div className="max-w-sm w-full h-136 bg-lime-300">TEST!</div>
            <div className="max-w-sm w-full h-136 bg-lime-300">TEST!</div>
            <div className="max-w-sm w-full h-136 bg-lime-300">TEST!</div>
          </div>
        </div>
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
