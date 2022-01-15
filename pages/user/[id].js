/* pages/index.js */
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import Footer from "../../components/Layout/Footer";
import { formatEtherscanLink, shortenHex } from "../../util";

import Nav from "../../components/Layout/Nav";
import Balance from "../../components/Utils/ETHBalance";

import { injected } from "../../connectors";
import { useWeb3React } from "@web3-react/core";

export default function Home() {
  const {
    active,
    error,
    activate,
    chainId,
    account,
    setError
  } = useWeb3React();

  const router = useRouter();
  const address = router.query.id;
  const [nfts, setNfts] = useState([]);
  const [created, setCreated] = useState([]);
  const [loadingState, setLoadingState] = useState("not-loaded");

  let id;
  id = router.query.id;
  if (!id && typeof window !== "undefined") {
    id = window.location.pathname.split("/").pop();
  }

  return (
    <div className="flex flex-col justify-between">
      <Nav />
      <div className="flex flex-col mx-auto">
        {account}
        <Balance />
      </div>
      <Footer />
    </div>
  );
}
