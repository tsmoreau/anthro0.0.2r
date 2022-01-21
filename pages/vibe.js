import { useWeb3React } from "@web3-react/core";
import Head from "next/head";
import Link from "next/link";
import Account from "../components/Utils/Account";
import Nav from "../components/Layout/Nav";
import Footer from "../components/Layout/Footer";
import useEagerConnect from "../hooks/useEagerConnect";

export default function Home() {
  const { account, library } = useWeb3React();

  const triedToEagerConnect = useEagerConnect();

  const isConnected = typeof account === "string" && !!library;

  return (
    <div className="w-full flex flex-col mx-auto bg-th-background">
      <Head>
        <title>Anthromancer - Vibe</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Nav />
      <main className="flex flex-col mx-auto w-2/3 bg-th-background font-futura mb-10 text-center justify-center">
        {/* Community Title Section */}
        <div id="community" className="py-8 ">
          <p className=" font-anthro text-th-primary-dark mt-16 decoration-th-accent-light underline font-futura font-medium text-7xl ">
            COMMUNITY
          </p>
        </div>

        {/* Community Section */}
        <div className=" w-full bg-th-background  mt-2 font-futura text-center justify-center flex mx-auto">
          <div className="overflow-hidden relative border h-136 w-full text-right  pb-4 flex border rounded-lg">
            <img
              src="/ProductShot.jpg"
              className="object-cover w-full h-136 object-center rounded-lg  "
            />
            <div className="text-white absolute bottom-20 left-12 text-left  justify-end">
              <p className="drop-shadow-lg text-5xl   my-2 mb-4 decoration-th-accent-light underline">
                Anthromancer
              </p>
              <p className="drop-shadow-lg text-2xl font-medium   my-2">
                First Edition
              </p>
              <p className="font-thin leading-wide drop-shadow-lg text-xl leading-snug  mt-2 ">
                The Ground-Breaking Original Board Game
              </p>
              <p className="font-thin leading-wide drop-shadow-lg text-xl leading-snug -mt-1  ">
                From the mind of Daniel James Drake and
              </p>
              <p className="font-thin leading-wide drop-shadow-lg text-xl leading-snug mb-2 -mt-1 ">
                Expressed through the Visual Language of Sean Calen Blake
              </p>
            </div>
            <div className="font-thin absolute bottom-6 text-center left-12  mr-1 font-futura text-xl text-white px-8 py-1 pt-1 font-light border-2 bg-th-primary-medium border-th-accent-light hover:bg-th-accent-light hover:border-th-primary-medium cursor-pointer ">
              ORDER NOW
            </div>
          </div>
        </div>
        {/* Music Section */}
        <div
          id="music"
          className="bg-th-background w-full mt-2 lg:mt-36 font-futura text-center justify-center"
        >
          <div className="py-8">
            <p className=" font-anthro text-th-primary-dark mt-16 decoration-th-accent-light underline font-futura font-medium text-7xl ">
              MUSIC
            </p>
          </div>

          <div className="flex mx-auto px-4 py-2 ">
            <div className="relative max-w-7x border h-128 l w-full text-right  pb-4 flex mx-auto border rounded-lg">
              <div className="absolute bottom-20 right-12 text-right  justify-end">
                <p className="text-5xl font-medium  my-2 mb-4 decoration-th-accent-light underline">
                  Yggdrasil
                </p>
                <p className="text-2xl font-medium   my-2">300/777 Minted</p>
                <p className="text-xl font-thin leading-wide drop-shadow-lg   mt-2 ">
                  Reward Token for Original Anthromancer
                </p>
                <p className="text-xl font-thin leading-wide drop-shadow-lg   -mt-2 ">
                  Board Game Kickstarter Backers
                </p>
                <p className="text-base font-normal leading-wide drop-shadow-lg   mt-2 ">
                  Offers a Discount on Anthromancer Hymn Tokens and a Free
                  Random
                </p>
                <p className="text-base font-normal leading-wide drop-shadow-lg   -mt-2 ">
                  Class Card in Anthromancer's Upcoming On-Chain Card Game.
                </p>

                <div className="text-lg leading-tight -mt-1 mb-2  "></div>
              </div>

              <div className="font-thin absolute bottom-6 text-center right-12  mr-1 font-futura text-xl text-white px-8 py-1 pt-1 font-light border-2 bg-th-primary-medium border-th-accent-light hover:bg-th-accent-light hover:border-th-primary-medium cursor-pointer ">
                AVAILABLE TO MINT NOW
              </div>
            </div>
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
