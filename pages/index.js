import { Fragment, useState, useEffect } from "react";
import { verifyMessage } from "@ethersproject/wallet";
import { useWeb3React } from "@web3-react/core";
import Head from "next/head";
import Link from "next/link";
import Account from "../components/Utils/Account";
import Nav from "../components/Layout/Nav";
import Footer from "../components/Layout/Footer";
import "animate.css/animate.min.css";

import ETHBalance from "../components/Utils/ETHBalance";
import useEagerConnect from "../hooks/useEagerConnect";
import usePersonalSign, { hexlify } from "../hooks/usePersonalSign";
import ScrollAnimation from "react-animate-on-scroll";
import ScrollToTop from "react-scroll-to-top";

const contractAddress2 = 0x4a139bb672adc671d84dd194a5d9f8ad8d7d7167;

function BackToTop() {
  return (
    <div className="flex mx-auto h-6 w-6">
      <svg
        width="24"
        height="24"
        xmlns="http://www.w3.org/2000/svg"
        className="fill-th-accent-light stroke-th-accent-light"
        stroke-width="1px"
      >
        <path d="M23.245 20l-11.245-14.374-11.219 14.374-.781-.619 12-15.381 12 15.391-.755.609z" />
      </svg>
    </div>
  );
}

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
    <div className="bg-th-background w-screen h-full relative">
      <Head>
        <title>Anthromancer - Home</title>
        <link rel="icon" href="/favicon.png" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css"
        />
      </Head>
      <div className="">
        <div className="flex mx-auto scale-30 bg-white opacity-90">
          <ScrollToTop smooth component={<BackToTop />} />
        </div>
      </div>
      <div className="absolute top-0 z-50 w-full">
        <Nav />
      </div>

      <div className="h-24 w-full bg-lime-300 invisible">Spacer</div>

      <ScrollAnimation
        animateIn="fadeInLeft"
        animateOut="fadeOut"
        duration={2}
        delay={0}
      >
        <div className="z-0 mt-12 overflow-hidden items-center border mx-4 lg:mx-20 rounded-lg   h-128">
          <img
            src="/ProductShot.jpg"
            className=" object-cover w-full h-128 object-center rounded-lg  "
          />
        </div>
      </ScrollAnimation>

      <ScrollAnimation
        animateIn="fadeInRight"
        animateOut="fadeOut"
        duration={2}
        delay={0}
      >
        <div className=" bg-th-background w-full py-2 lg:py-8  text-right justify-end align-bottom">
          <div className="relative border mx-4 lg:mx-20 rounded-lg  bg-slate-200 h-136">
            <p className="absolute bottom-5 right-10">TS</p>
          </div>
        </div>
      </ScrollAnimation>

      <div className="bg-th-background w-full py-2 lg:py-8  text-center justify-center">
        <div className="border mx-4 lg:mx-20 rounded-lg  bg-slate-200 h-136">
          TS
        </div>
      </div>
      <div className="text-center items-center justify-center flex mx-auto text-primary-dark text-4xl  flex mx-auto bg-th-background">
        Some Text
      </div>

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
