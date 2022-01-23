import { useWeb3React } from "@web3-react/core";
import Head from "next/head";
import Link from "next/link";
import Account from "../../../components/Utils/Account";
import Nav from "../../../components/Layout/Nav";
import Alert from "../../../components/Layout/Alert";

import Footer from "../../../components/Layout/Footer";
import useEagerConnect from "../../../hooks/useEagerConnect";
import { Fragment, useState, useEffect } from "react";
import ScrollToTop from "react-scroll-to-top";

import React from "react";
import PropTypes from "prop-types";

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

function YggClaim() {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState("");
  const [content, setContentFromDb] = useState([]);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState(0);
  const [obj, setObj] = useState(0);
  const [noCode, setNoCode] = useState(false);
  const [redeemed, setRedeemed] = useState(true);
  const { account, library } = useWeb3React();
  const [formInput, updateFormInput] = useState({
    email: "",
    code: ""
  });

  const getOnePost2 = async () => {
    console.log("Getting your data!");
    console.log(code);
    setContentFromDb([]);

    // reset error and message
    setError("");
    setMessage("");

    // get the posts
    let response = await fetch("/api/yggGetEmailFromCode", {
      method: "POST",
      body: JSON.stringify(code)
    });

    // get the data
    let data = await response.json();
    console.log(noCode);
    console.log("status");
    console.log(data.status);
    if (data.message === "No Code") {
      setNoCode(true);
    }

    if (data.message !== "No Code") {
      console.log("Status");
      setNoCode(false);
      console.log("Message");
      console.log(data.message);
      console.log("Test");
      console.log(data.message[0]._id);
      console.log(data.message);
      console.log("TES2");
      console.log({ email: data.message[0].email, code: code });

      updateFormInput({ email: data.message[0].email, code: code });

      setContentFromDb(data.message);
      setObj(data.message[0]._id);
      setRedeemed(data.message[0].redeemed);
      setEmail(data.message[0].email);
    } else {
      // set the error
      return setError(data.message);
    }
  };

  function checkIsRedeemed() {}

  const dbOnlyRedeem = async () => {
    console.log("Redeeming in DB!");
    console.log(obj);

    // reset error and message
    setError("");
    setMessage("");

    // get the posts
    let response = await fetch("/api/yggGetEmailFromCode", {
      method: "PUT",
      body: JSON.stringify({ content, account })
    });

    // get the data
    let data = await response.json();
    console.log(data);

    if (data.success) {
      // reset the fields and log the data
      getOnePost2();
    } else {
      // set the error
      return setError(data.message);
    }
  };

  useEffect(() => {}, []);

  async function callRelayer() {
    if (!formInput.email || !formInput.code) {
      console.log("error");
    } else {
      setLoading(true);
      console.log("Wallet Address");
      console.log(account);
      console.log("Email");
      console.log(formInput.email);
      console.log("Code");
      console.log(formInput.code);
      let response = await fetch("/api/yggDefenderConnect", {
        method: "POST",
        body: JSON.stringify({ account, formInput }),
        headers: { "Content-Type": "application/json" }
      });
      console.log(response);

      let data = await response.json();
      console.log("data");
      console.log(data.result);

      let test2 = `"test"`;
      console.log(test2);

      if (data.result === test2) {
        // reset the fields and log the data

        console.log("Success");
        dbOnlyRedeem();
        setLoading(false);
      } else {
        // set the error
        setLoading(false);
        return setError(data.message);
      }
    }
  }

  return (
    <div>
      {!loading ? (
        <div></div>
      ) : (
        <div className="flex flex-col fixed top-0 left-0 right-0 w-screen h-screen bg-black/[.6] px-1 py-0.5 text-center justify-center items-center">
          <div className="text-white text-4xl animate-[pulse_2s_ease-in-out_infinite]">
            Transaction Sent, Please Wait...
          </div>
        </div>
      )}

      <div className="flex flex-col items-center justify-center  mx-auto text-center">
        <div className="text-center  px-5 py-2   mx-5">
          <form>
            <div className="w-full font-futura text-white text-xl flex flex-col items-center justify-center mx-auto  w-3/4"></div>
            <input
              type="text"
              name="code"
              onChange={(e) => setCode(e.target.value)}
              placeholder="Claim Code From Email"
              className="w-full my-2 p-2 border rounded-lg text-th-primary-dark bg-th-background"
            />
          </form>
          <button
            onClick={getOnePost2}
            className="w-72 font-futura text-xl text-white px-5 py-0.5 pt-0.5 font-light border-2 bg-th-primary-medium border-th-accent-light hover:bg-th-primary-medium"
          >
            Check Code
          </button>
        </div>
        {noCode === false ? (
          <div className=""></div>
        ) : (
          <div className="text-center w-72 font-futura text-xl text-white px-5 py-0.5 pt-0.5 font-light border-2 bg-th-primary-medium border-th-accent-light hover:bg-th-primary-medium">
            Not A Valid Code!
          </div>
        )}
      </div>

      {/* // DIVIDER BETWEEN COMPONENTS // */}
      <div className="font-futura w-full flex flex-row flex-1 mx-auto justify-center text-center">
        <div className="text-center  px-5 py-2  rounded-lg mx-5">
          <div className="w-full">
            {content
              ? content.map((ele, i) => {
                  return (
                    <div
                      key={i}
                      className="flex flex-row justify-evenly items-center"
                    >
                      <div className="w-full text-left mx-4 px-4">
                        <p className="">
                          {ele.redeemed === false ? (
                            <div>
                              <p className="w-80 text-center mb-2">
                                (Please Ensure The Email Below Is Yours Before
                                Final Redemption)
                              </p>

                              <p className="w-full text-center mb-3">
                                {ele.email}
                              </p>
                            </div>
                          ) : (
                            <div></div>
                          )}
                        </p>

                        {ele.redeemed === false ? (
                          <div className="flex mx-auto">
                            <div
                              onClick={callRelayer}
                              className="cursor-pointer text-center w-80 font-futura text-xl text-white px-5 py-0.5 pt-0.5 font-light border-2 bg-th-primary-medium border-th-accent-light hover:bg-th-primary-medium"
                            >
                              Redeem Code!
                            </div>
                          </div>
                        ) : (
                          <div>
                            <div className="text-center w-80 font-futura text-xl text-white px-5 py-0.5 pt-0.5 font-light border-2 bg-th-primary-medium border-th-accent-light hover:bg-th-primary-medium">
                              Your Code Has Been Redeemed!
                            </div>
                            <div className="flex flex-col items-center mx-auto">
                              <a
                                href="https://testnets.opensea.io/assets/0x992ACb693E448a3C82DBBf1b3828920737a76D03/1"
                                className="mx-4 mt-2 justify-center border rounded-lg cursor-pointer text-center w-11/12 flex mx-auto font-futura text-xl text-white px-5 py-0.5 pt-0.5 font-light  "
                              >
                                <svg
                                  width="45"
                                  height="45"
                                  viewBox="0 0 90 90"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M90 45C90 69.8514 69.8514 90 45 90C20.1486 90 0 69.8514 0 45C0 20.1486 20.1486 0 45 0C69.8566 0 90 20.1486 90 45Z"
                                    fill="#2081E2"
                                  />
                                  <path
                                    d="M22.2011 46.512L22.3953 46.2069L34.1016 27.8939C34.2726 27.6257 34.6749 27.6535 34.8043 27.9447C36.76 32.3277 38.4475 37.7786 37.6569 41.1721C37.3194 42.5683 36.3948 44.4593 35.3545 46.2069C35.2204 46.4612 35.0725 46.7109 34.9153 46.9513C34.8413 47.0622 34.7165 47.127 34.5824 47.127H22.5432C22.2196 47.127 22.0301 46.7756 22.2011 46.512Z"
                                    fill="white"
                                  />
                                  <path
                                    d="M74.38 49.9149V52.8137C74.38 52.9801 74.2783 53.1281 74.1304 53.1928C73.2242 53.5812 70.1219 55.0052 68.832 56.799C65.5402 61.3807 63.0251 67.932 57.4031 67.932H33.949C25.6362 67.932 18.9 61.1727 18.9 52.8322V52.564C18.9 52.3421 19.0803 52.1618 19.3023 52.1618H32.377C32.6359 52.1618 32.8255 52.4022 32.8024 52.6565C32.7099 53.5072 32.8671 54.3764 33.2693 55.167C34.0461 56.7435 35.655 57.7283 37.3934 57.7283H43.866V52.675H37.4673C37.1391 52.675 36.9449 52.2959 37.1345 52.0277C37.2038 51.9214 37.2824 51.8104 37.3656 51.6856C37.9713 50.8257 38.8358 49.4895 39.6958 47.9684C40.2829 46.9421 40.8516 45.8463 41.3093 44.746C41.4018 44.5472 41.4758 44.3438 41.5497 44.1449C41.6746 43.7936 41.804 43.4653 41.8965 43.1371C41.9889 42.8597 42.0629 42.5684 42.1369 42.2956C42.3542 41.3617 42.4467 40.3723 42.4467 39.3459C42.4467 38.9437 42.4282 38.523 42.3912 38.1207C42.3727 37.6815 42.3172 37.2423 42.2617 36.8031C42.2247 36.4147 42.1554 36.031 42.0814 35.6288C41.9889 35.0416 41.8595 34.4591 41.7115 33.8719L41.6607 33.65C41.5497 33.2478 41.4573 32.864 41.3278 32.4618C40.9626 31.1996 40.5418 29.9698 40.098 28.8186C39.9362 28.3609 39.7512 27.9217 39.5663 27.4825C39.2935 26.8213 39.0161 26.2203 38.7619 25.6516C38.6324 25.3927 38.5214 25.1569 38.4105 24.9165C38.2857 24.6437 38.1562 24.371 38.0268 24.112C37.9343 23.9132 37.8279 23.7283 37.754 23.5434L36.9634 22.0824C36.8524 21.8836 37.0374 21.6478 37.2546 21.7079L42.2016 23.0487H42.2155C42.2247 23.0487 42.2294 23.0533 42.234 23.0533L42.8859 23.2336L43.6025 23.437L43.866 23.511V20.5706C43.866 19.1512 45.0034 18 46.4089 18C47.1116 18 47.7496 18.2866 48.2073 18.7536C48.665 19.2206 48.9517 19.8586 48.9517 20.5706V24.935L49.4787 25.0829C49.5204 25.0968 49.562 25.1153 49.599 25.143C49.7284 25.2401 49.9133 25.3835 50.1491 25.5591C50.3341 25.7071 50.5329 25.8874 50.7733 26.0723C51.2495 26.4561 51.8181 26.9508 52.4423 27.5194C52.6087 27.6628 52.7706 27.8107 52.9185 27.9587C53.723 28.7076 54.6245 29.5861 55.4845 30.557C55.7249 30.8297 55.9607 31.1071 56.2011 31.3984C56.4415 31.6943 56.6958 31.9856 56.9177 32.2769C57.209 32.6652 57.5233 33.0674 57.7961 33.4882C57.9256 33.687 58.0735 33.8904 58.1984 34.0892C58.5497 34.6209 58.8595 35.1711 59.1554 35.7212C59.2802 35.9755 59.4097 36.2529 59.5206 36.5257C59.8489 37.2608 60.1078 38.0098 60.2742 38.7588C60.3251 38.9206 60.3621 39.0963 60.3806 39.2535V39.2904C60.436 39.5124 60.4545 39.7482 60.473 39.9886C60.547 40.756 60.51 41.5235 60.3436 42.2956C60.2742 42.6239 60.1818 42.9336 60.0708 43.2619C59.9598 43.5763 59.8489 43.9045 59.7056 44.2143C59.4282 44.8569 59.0999 45.4996 58.7115 46.1006C58.5867 46.3225 58.4388 46.5583 58.2908 46.7802C58.129 47.016 57.9626 47.238 57.8146 47.4553C57.6112 47.7327 57.3939 48.0239 57.172 48.2828C56.9732 48.5556 56.7697 48.8284 56.5478 49.0688C56.2381 49.434 55.9422 49.7808 55.6324 50.1137C55.4475 50.331 55.2487 50.5529 55.0452 50.7517C54.8464 50.9736 54.643 51.1724 54.4581 51.3573C54.1483 51.6671 53.8894 51.9075 53.6721 52.1063L53.1635 52.5733C53.0896 52.638 52.9925 52.675 52.8908 52.675H48.9517V57.7283H53.9079C55.0175 57.7283 56.0716 57.3353 56.9223 56.6141C57.2136 56.3598 58.485 55.2594 59.9876 53.5997C60.0384 53.5442 60.1032 53.5026 60.1771 53.4841L73.8668 49.5265C74.1211 49.4525 74.38 49.6467 74.38 49.9149Z"
                                    fill="white"
                                  />
                                </svg>
                                <p className="text-center text-base mt-2.5 pl-2 ml-2 ">
                                  View your Item on OpenSea!
                                </p>
                              </a>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })
              : null}
          </div>
        </div>
      </div>
    </div>
  );
}

const YoutubeEmbed = ({ embedId }) => (
  <div className="video-responsive">
    <iframe
      width="100%"
      height="100%"
      src={`https://www.youtube.com/embed/${embedId}`}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title="Embedded youtube"
    />
  </div>
);

YoutubeEmbed.propTypes = {
  embedId: PropTypes.string.isRequired
};

export default function Home() {
  const { account, library } = useWeb3React();
  const [content, setContentFromDb] = useState([]);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [formInput, updateFormInput] = useState({
    code: ""
  });

  const triedToEagerConnect = useEagerConnect();

  const isConnected = typeof account === "string" && !!library;

  async function callRelayer() {
    if (!formInput.code) {
      console.log("error");
    } else {
      console.log("Wallet Address");
      console.log(account);
      console.log("Code");
      console.log(formInput.code);
      let response = await fetch("api/yggDefenderConnect", {
        method: "POST",
        body: JSON.stringify({ account, formInput }),
        headers: { "Content-Type": "application/json" }
      });
      console.log(response);
    }
  }

  const getOnePost2 = async () => {
    console.log("Getting your data!");
    console.log(formInput.code);

    // reset error and message
    setError("");
    setMessage("");

    // get the posts
    let response = await fetch("/api/yggGetEmailFromCode", {
      method: "POST",
      body: JSON.stringify(formInput.code)
    });

    // get the data
    let data = await response.json();

    if (data.success) {
      // reset the fields and log the data
      console.log(data.message);
      setContentFromDb(data.message);
    } else {
      // set the error
      return setError(data.message);
    }
  };

  const getOnePost = async () => {
    console.log("Getting your data!");
    console.log("a68004ae-8d0c-4f7c-9c53-7bbf263bfa15");

    // reset error and message
    setError("");
    setMessage("");

    // get the posts
    let response = await fetch("/api/yggGetEmailFromCode", {
      method: "POST",
      body: JSON.stringify("a68004ae-8d0c-4f7c-9c53-7bbf263bfa15")
    });

    // get the data
    let data = await response.json();

    if (data.success) {
      // reset the fields and log the data
      console.log(data.message);
      setContentFromDb(data.message);
    } else {
      // set the error
      return setError(data.message);
    }
  };

  const getOnePost3 = async () => {
    console.log("Getting your data!");

    // reset error and message
    setError("");
    setMessage("");

    // get the posts
    let response = await fetch("/api/yggGetEmailFromCode", {
      method: "GET"
    });

    // get the data
    let data = await response.json();

    if (data.success) {
      // reset the fields and log the data
      console.log(data.message);
      setContentFromDb(data.message);
    } else {
      // set the error
      return setError(data.message);
    }
  };

  return (
    <div>
      <Head>
        <title>Anthromancer - Yggdrasil</title>
        <link rel="icon" href="/favicon.png" />
      </Head>

      <Nav />
      <div className=" bg-th-background text-th-primary-dark">
        <div className="w-screen flex ">
          <div
            id="scroller"
            className="snap-y w-full lg:w-8/12 h-screen lg:h-156 overflow-scroll"
          >
            <div className="">
              <div className="flex mx-auto scale-30 bg-white opacity-90">
                <ScrollToTop smooth component={<BackToTop />} />
              </div>
            </div>
            <div className="lg:hidden -translate-y-10 flex snap-center bg-th-background w-full  h-screen lg:h-156  flex-col text-center items-center justify-center text-base px-3 ">
              <p className="font-futura text-3xl leading-tight lg:leading-relaxed font-semibold text-left underline underline-offset-2 decoration-th-accent-light">
                ∞. Yggdrasil
              </p>
              <div className="w-8/12 flex mx-auto rounded-lg mt-4 justify-center">
                <video
                  width="320"
                  height="240"
                  autoPlay
                  muted
                  loop
                  className="rounded-lg flex mx-auto"
                >
                  <source
                    src="https://gateway.ipfs.io/ipfs/QmVwJGSZmsBzsseFEx3RtCnGL8q5d1DXZQxUkDt7aCjEpd"
                    type="video/mp4"
                  />
                </video>
              </div>

              <p className=" font-futura px-12 pt-1 text-sm justify-center text-center flex flex-col items-center">
                {!account ? (
                  <div>
                    <p className="font-futura px-12 pt-1 text-xl justify-center text-center flex flex-col items-center">
                      To Claim:
                    </p>
                    <a href="https://www.one37pm.com/nft/tech/how-to-set-up-metamask-wallet">
                      <div className="w-96 lg:w-72 mb-2 font-futura text-xl text-white px-5 py-0.5 pt-0.5 font-light border-2 bg-th-primary-medium border-th-accent-light hover:bg-th-primary-medium">
                        1) Setup Your Metamask Wallet
                      </div>
                    </a>
                  </div>
                ) : (
                  <div className="text-center text-base w-full mt-6">
                    Your Wallet Address: <br />
                    {account}
                    <p className="font-futura w-full pt-1 text-sm justify-center text-center flex flex-col items-center">
                      (This is the address where your Yggdrasil Token will be
                      sent.)
                    </p>
                  </div>
                )}

                {!account ? (
                  <div className="w-96 lg:w-72 font-futura text-xl text-white px-5 py-0.5 pt-0.5 font-light border-2 bg-th-primary-medium border-th-accent-light hover:bg-th-primary-medium">
                    2) Connect Your Wallet Above
                  </div>
                ) : (
                  <div>
                    <YggClaim />
                  </div>
                )}
              </p>
              <div className="mt-6">
                <p className="font-futura text-lg font-bold">
                  More info below...
                </p>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  className="flex mx-auto mt-4  animate-pulse animate-animated animate-infinite"
                  stroke="#67e8f9"
                  strokeWidth="3px"
                  fill="none"
                >
                  <path d="M12 21l-12-18h24z" />
                </svg>
              </div>
            </div>
            <div className="font-futura snap-center  bg-th-background w-full h-screen lg:h-156 flex flex-col text-center items-center justify-center text-base px-3 lg:px-36">
              <div className="-mt-16 w-full font-futura leading-tight">
                <p className="hidden lg:flex font-futura text-5xl leading-tight lg:leading-relaxed font-semibold text-left underline underline-offset-2 decoration-th-accent-light">
                  ∞. Yggdrasil
                </p>
                <p className="lg:hidden font-futura text-3xl leading-tight lg:leading-relaxed font-semibold text-left underline underline-offset-2 decoration-th-accent-light">
                  The Beginning...
                </p>

                <p className="pt-6">
                  <span className="italic">"What IS this place?"</span> Roxas
                  asks, gazing up into the branches of the pale tree...
                </p>
                <p className="pt-6">
                  <span className="italic">
                    "It is the place beyond the place,"
                  </span>{" "}
                  the Fox replies,{" "}
                  <span className="italic">
                    "The time from which ALL times begin..."
                  </span>
                </p>
                <p className="pt-6 leading-2">
                  As a token of our gratitude for their support, every verified
                  backer of the 2020 Anthromancer Kickstarter Campaign is
                  eligible to claim a single limited edition “Yggdrasil” NFT,
                  secured on the Ethereum blockchain for all time. These ERC-721
                  tokens will enable the holder to participate in secret
                  experiences, grant special access to playtesting and live
                  events, and unlock discounts on future NFT drops and gaming
                  applications, for the life of the Anthromancer brand. Gas for
                  claiming has been prepaid, and the claim codes distributed via
                  email do not expire. We are moved by your support, and are
                  grateful for the opportunity to repay you in some small way.
                  Thank you.
                </p>
              </div>
              <div className="mt-4">
                <p className=" text-lg font-bold">How to Get Started...</p>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  className="flex mx-auto mt-4  animate-pulse animate-animated animate-infinite"
                  stroke="#67e8f9"
                  strokeWidth="3px"
                  fill="none"
                >
                  <path d="M12 21l-12-18h24z" />
                </svg>
              </div>
            </div>
            <div className="font-futura snap-center bg-th-background w-full  h-screen lg:h-156 flex flex-col text-center items-center justify-center text-base px-3 lg:px-36">
              <div className="-mt-24 w-full">
                <p className=" text-3xl font-bold text-left underline underline-offset-2 decoration-th-accent-light">
                  How to Get Started
                </p>

                <div className="mt-3">
                  <YoutubeEmbed embedId="rokGy0huYEA" />
                </div>
              </div>
              <div className="mt-8">
                <p className=" text-lg font-bold">The Steps...</p>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  className="flex mx-auto mt-4  "
                  stroke="#67e8f9"
                  strokeWidth="3px"
                  fill="none"
                >
                  <path d="M12 21l-12-18h24z" />
                </svg>
              </div>
            </div>
            <div className="font-futura leading-tight snap-center bg-th-background w-full h-screen lg:h-156 flex flex-col text-center items-center justify-center text-base px-3 lg:px-36">
              <div className="-mt-12 w-full  leading-tight">
                <p className="text-3xl font-bold text-left underline underline-offset-2 decoration-th-accent-light">
                  The Steps
                </p>

                <p className="pt-6 text-xl font-bold text-left left-0">
                  1) Setup Your Metamask
                </p>
                <p className="px-1 lg:px-6 pt-1 leading-2 ">
                  Download and install the Metamask browser extension. You can
                  do so by visiting the Metamask website or following a tutorial
                  like the one from this ONE37pm article here.
                </p>
                <p className="px-1 lg:px-6 pt-3 leading-2 text-center font-semibold">
                  **IMPORTANT** When MetaMask reveals your secret words, DO NOT
                  forget to write them down! This section is bolded so that you
                  don't accidentally skim and lose access to your wallet
                  forever. DO NOT store your secret words online, as that can be
                  a potential security risk. Instead, write them in a notebook
                  or something secure you will not misplace.
                </p>
                <p className="pt-6 text-xl font-bold text-left left-0">
                  2) Connect to this Site
                </p>
                <p className="px-1 lg:px-6 pt-1">
                  When you wallet is set up, connect it to our website using the
                  'Connect Wallet' button (top right). The address that appears
                  in the top right is yours, and is where your token will be
                  sent.
                </p>
                <p className="pt-6 text-xl font-bold text-left left-0">
                  3) Claim your NFT
                </p>
                <p className="px-1 lg:px-6 pt-1 leading-2">
                  Enter the Claim Code received in your Kickstarter update email
                  into the input box and click "Check Code". You will be
                  prompted with the email address associated with your code, and
                  asked to click "Redeem Code" to finalize the transaction. You
                  will be presented with a "Transaction Sent, Please Wait"
                  screen, and should wait the transaction is confirmed before
                  navigating away. When the transaction is confirmed you will
                  then be presented with a link to your new token!
                </p>
              </div>
              <div className="mt-8">
                <p className=" text-lg font-bold">Now What...</p>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  className="flex mx-auto mt-4  "
                  stroke="#67e8f9"
                  strokeWidth="3px"
                  fill="none"
                >
                  <path d="M12 21l-12-18h24z" />
                </svg>
              </div>
            </div>
            <div className="font-futura snap-center bg-th-background w-full h-screen lg:h-156 flex flex-col text-center items-center justify-center text-base px-3 lg:px-36">
              <div className="-mt-12 w-full leading-tight">
                <p className="text-3xl font-bold text-left underline underline-offset-2 decoration-th-accent-light">
                  Congratulations! Now What?
                </p>

                <p className="-px-1 lg:px-6 pt-8 leading-2">
                  Now that you hold an Anthromancer NFT, you will be eligible to
                  receive discounts on future Anthromancer NFT drops, early
                  access to beta testing for chain-based games and apps we
                  develop, and access to a special community of dedicated fans
                  and builders organized via our community discord server. All
                  you have to do is protect your wallet and seed phrase, and
                  keep the token safe within it.
                </p>
                <p className="hidden -px-1 lg:px-6 pt-3 leading-2">
                  You are also free to sell your token on a marketplace such as
                  Opensea.io, to trade it for other tokens via a service such as
                  sudoswap, to display it in a virtual gallery such as
                  OnCyber.io to build applications that use it, or to hold it
                  and forget you even have it until it becomes useful to you. We
                  intend to develop all of our future games and experiences so
                  that holders of these early tokens are given special
                  consideration and novel powers in Anthromancer experiences.
                  This token is our opportunity to deliver value to those who
                  believed in us from the outset, and we find great joy in
                  knowing we can express our gratitude to you, forever, thanks
                  to the mechanism of tokenized assets. Thank you for playing
                  along; we look forward to the next time we can play together.
                </p>
              </div>
              <div className="mt-8">
                <p className="text-lg font-bold ">
                  What's next for Anthromancer?
                </p>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  className="flex mx-auto mt-4  "
                  stroke="#67e8f9"
                  strokeWidth="3px"
                  fill="none"
                >
                  <path d="M12 21l-12-18h24z" />
                </svg>
              </div>
            </div>
            <div className="leading-tight font-futura snap-center bg-th-background w-full h-screen lg:h-156 flex flex-col text-center items-center justify-center text-base px-3 lg:px-36">
              <div className="-mt-8 w-full ">
                <p className="text-3xl font-bold text-left underline underline-offset-2 decoration-th-accent-light">
                  What's Next for Anthromancer?
                </p>

                <p className="pt-6 leading-2">
                  In the following months and years Anthromancer will release a
                  series of NFT projects which will connect a strong community
                  of friends, fans, gamers and builders. By incentivizing the
                  creation of this community via value-sharing and giveaways, we
                  hope to spark a self-sustaining energy that will carry this
                  brand and the products associated with it to widespread
                  adoption, and through that adoption, change the world. If
                  you'’'d like to know more about our mid- and long-term vision,
                  we invite you to take a look at our Road Map.
                </p>
                <p className="italic mt-8 ">
                  This is Anthromancer. Welcome to The Enlightenment Machine.
                </p>
                <img src="/favicon.png" className="flex mx-auto w-12 mt-6" />
              </div>
              <div className="hidden bottom-0 -translate-y-16">
                <p className=" text-xl font-bold">
                  5. What's next for Anthromancer ..?
                </p>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  className="flex mx-auto mt-4  "
                  stroke="#67e8f9"
                  strokeWidth="3px"
                  fill="none"
                >
                  <path d="M12 21l-12-18h24z" />
                </svg>
              </div>
            </div>
          </div>
          <div className=" hidden lg:flex flex-col lg:w-4/12 text-center mx-auto">
            <div className="w-8/12 flex mx-auto rounded-lg mt-12">
              <video
                width="320"
                height="240"
                autoPlay
                muted
                loop
                className="rounded-lg"
              >
                <source
                  src="https://gateway.ipfs.io/ipfs/QmVwJGSZmsBzsseFEx3RtCnGL8q5d1DXZQxUkDt7aCjEpd"
                  type="video/mp4"
                />
              </video>
            </div>
            <p className="hidden text-3xl font-bold">∞. Yggdrasil</p>

            <p className="font-futura px-12 pt-1 text-sm justify-center text-center flex flex-col items-center">
              {!account ? (
                <div>
                  <p className="font-futura px-12 pt-1 text-xl justify-center text-center flex flex-col items-center">
                    To Claim:
                  </p>
                  <a href="https://www.one37pm.com/nft/tech/how-to-set-up-metamask-wallet">
                    <div className="w-72 mb-2 font-futura text-xl text-white px-5 py-0.5 pt-0.5 font-light border-2 bg-th-primary-medium border-th-accent-light hover:bg-th-primary-medium">
                      1) Setup Your Metamask Wallet
                    </div>
                  </a>
                </div>
              ) : (
                <div className="text-center text-base w-full">
                  Your Wallet Address: <br />
                  {account}
                  <p className="font-futura w-full pt-1 text-sm justify-center text-center flex flex-col items-center">
                    (This is the address where your Yggdrasil Token will be
                    sent.)
                  </p>
                </div>
              )}

              {!account ? (
                <div className="w-72 font-futura text-xl text-white px-5 py-0.5 pt-0.5 font-light border-2 bg-th-primary-medium border-th-accent-light hover:bg-th-primary-medium">
                  2) Connect Your Wallet Above
                </div>
              ) : (
                <div>
                  <YggClaim />
                </div>
              )}
            </p>
          </div>
        </div>
      </div>
      <div className="hidden lg:flex mx-auto">
        <Footer />
      </div>

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
