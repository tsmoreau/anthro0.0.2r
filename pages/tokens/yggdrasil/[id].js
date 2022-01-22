import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import Account from "../../../components/Utils/Account";
import Nav from "../../../components/Layout/Nav";
import Alert from "../../../components/Layout/Alert";

import Footer from "../../../components/Layout/Footer";
import useEagerConnect from "../../../hooks/useEagerConnect";
import { Fragment, useState, useEffect } from "react";

import React from "react";
import PropTypes from "prop-types";

export default function Home() {
  const router = useRouter();

  let id;
  id = router.query.id;
  if (!id && typeof window !== "undefined") {
    id = window.location.pathname.split("/").pop();
  }
  return (
    <div className="w-full h-full">
      <Nav />
      <div className="h-136 font-futura text-3xl text-center items-center bg-th-background text-th-primary-dark">
        {id}
      </div>
      <Footer />

      <style jsx>{`
        nav {
          display: flex;
          justify-content: space-between;
        }

        main {
          text-align: center;
        }

        @font-face {
          font-family: myFirstFont123;
          src: url(/fonts/BlankRiver.ttf);
        }

        #depict,
        #depict3 {
          font-family: myFirstFont123;
          text-shadow: 1px 1px white;
        }

        #scroller::-webkit-scrollbar {
          display: none;
        }

        #scroller {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        #NFT {
          -moz-animation: spinHorizontal 10s infinite linear;
          -o-animation: spinHorizontal 10s infinite linear;
          -webkit-animation: spinHorizontal 10s infinite linear;
          animation: spinHorizontal 10s infinite linear;
        }

        @keyframes spinHorizontal {
          0% {
            transform: rotateY(0deg);
          }
          100% {
            transform: rotateY(360deg);
          }
        }
      `}</style>
    </div>
  );
}
