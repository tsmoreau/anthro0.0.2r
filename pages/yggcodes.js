import { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import Nav from "../components/Layout/Nav";
import moment from "moment";

import { emails } from "../components/Samples/testEmails";
import { v4 as uuidv4 } from "uuid";

let date = moment(Date.now()).format("LLLL");

export default function AddPost() {
  const [code, setCode] = useState("");
  const [content, setContentFromDb] = useState([]);
  const [content2, setContentFromDb2] = useState([]);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [emailCounter, setEmailCounted] = useState(0);

  const { account } = useWeb3React();

  const automatedUpload = async () => {
    console.log("Beginning Upload of Email/Code Pairs to DB...");
    // reset error and message
    setError("");
    setMessage("");

    for (let i = 0; i < emails.length; i++) {
      console.log("Uploading Backer Info", { i });

      // post structure
      let codeData = {
        code: uuidv4(),
        redeemed: false,
        email: emails[i].email,
        redeemedBy: "N/A",
        redeemedAt: "N/A",
        redeemedTx: "N/A",
        createdAt: date
      };
      console.log(codeData);
      // save the post
      let response = await fetch("/api/yggCodesUpload", {
        method: "POST",
        body: JSON.stringify(codeData)
      });
    }
  };

  const handlePost = async () => {
    console.log("OMG handling your post!");
    // reset error and message
    setError("");
    setMessage("");

    // post structure
    let codeData = {
      code: uuidv4(),
      redeemed: false,
      email: emails[1].email,
      redeemedBy: "Not Redeemed",
      redeemedAt: "Not Redeemed",
      redeemedTx: "Not Redeemed",
      createdAt: date
    };

    // save the post
    let response = await fetch("/api/yggCodesUpload", {
      method: "POST",
      body: JSON.stringify(codeData)
    });

    // get the data
    let data = await response.json();

    if (data.success) {
      // reset the fields
      setCode("");
      // set the message
      getPosts();
      return setMessage(data.message);
    } else {
      // set the error
      return setError(data.message);
    }
  };

  const getPosts = async () => {
    console.log("Getting your data!");

    // reset error and message
    setError("");
    setMessage("");

    // get the posts
    let response = await fetch("/api/yggcodes", {
      method: "ONE"
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

  const getOnePost2 = async () => {
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

  const getOnePost = async () => {
    console.log("Getting your data!");

    // reset error and message
    setError("");
    setMessage("");

    // get the posts
    let response = await fetch("/api/yggcodes", {
      method: "GET"
    });

    // get the data
    let data = await response.json();

    if (data.success) {
      // reset the fields and log the data
      console.log(data.message);
      setContentFromDb2(data.message);
    } else {
      // set the error
      return setError(data.message);
    }
  };

  const deletePost = async (id) => {
    // e.preventDefault();
    console.log("Fuckin' up ur data!", id);

    // reset error and message
    setError("");
    setMessage("");

    // delete the post
    let response = await fetch("/api/yggcodes", {
      method: "DELETE",
      body: id
    });

    // get the data
    let data = await response.json();

    if (data.success) {
      // reset the fields and log the data
      console.log("DELETE MSG", data.message);
      getOnePost();
    } else {
      // set the error
      return setError(data.message);
    }
  };

  useEffect(() => {
    getOnePost();
    getOnePost2();
  }, []);

  return (
    <div className="w-full">
      <Nav />
      <div className="flex justify-center  mx-auto text-center">
        <button
          onClick={automatedUpload}
          className="px-3 py-0.5 border rounded-lg"
        >
          TEST UPLOAD
        </button>
        <svgParts />
        <form onSubmit={handlePost}>
          <div className="text-center border px-5 py-2 bg-th-accent-light rounded-lg m-5">
            {error ? (
              <div>
                <h3>{error}</h3>
              </div>
            ) : null}
            {message ? (
              <div className=" px-1 py-0.5 border rounded-lg">
                <h3>{message}</h3>
              </div>
            ) : null}

            <div className="mb-2">Enter Code (Manual)</div>
            <input
              type="text"
              name="code"
              onChange={(e) => setCode(e.target.value)}
              value={code}
              placeholder="Code"
            />

            <div className="">
              <button
                type="submit"
                className="px-3 py-1 border rounded mt-2 hover:bg-th-background"
              >
                Add Code
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* 
      <div className="w-full  flex mx-auto justify-center text-center">
        <div className="text-center border px-5 py-2 bg-th-accent-light rounded-lg m-5">
          Upload Code Array (Auto)
          <div className="">
            <button className="px-3 py-1 border rounded mt-2 hover:bg-th-background">
              Upload Codes
            </button>
          </div>
        </div>
      </div> */}

      <div className="w-full  flex mx-auto justify-center text-center">
        <div className="text-center border px-5 py-2 bg-th-accent-light rounded-lg m-5">
          Fetch Codes from DB
          <div className="">
            <button
              onClick={getPosts}
              className="px-3 py-1 border rounded mt-2 hover:bg-th-background"
            >
              Fetch!
            </button>
          </div>
        </div>
      </div>

      {/* // DIVIDER BETWEEN COMPONENTS // */}
      <div className="w-full flex flex-row flex-1 mx-auto justify-center text-center">
        <div className="text-center border px-5 py-2 bg-th-accent-light rounded-lg m-5">
          Codes in Database
          <div className="w-full">
            {content
              ? content.map((ele, i) => {
                  return (
                    <div
                      key={i}
                      className="flex flex-row justify-evenly items-center"
                    >
                      <div className="w-full text-left m-4 p-4">
                        <p className="mb-3">Id: {ele._id}</p>
                        <p>Email: {ele.email}</p>
                        <p>Code: {ele.code}</p>

                        <p>
                          Redeemed: {ele.redeemed === false ? "false" : "true"}
                        </p>

                        <p>Redeemed By: {ele.redeemedBy}</p>
                        <p>Redeemed Tx: {ele.redeemedTx}</p>
                        <p>Redeemed Date: {ele.redeemedAt}</p>
                        <p>Created At: {ele.createdAt}</p>
                        <br />
                        <hr className="w-1/2" />
                      </div>
                      <div>
                        <button onClick={() => deletePost(ele._id)}>
                          <svg
                            width="24"
                            height="24"
                            xmlns="http://www.w3.org/2000/svg"
                            fillRule="evenodd"
                            clipRule="evenodd"
                            className="fill-th-background"
                          >
                            <path d="M19 24h-14c-1.104 0-2-.896-2-2v-16h18v16c0 1.104-.896 2-2 2m-9-14c0-.552-.448-1-1-1s-1 .448-1 1v9c0 .552.448 1 1 1s1-.448 1-1v-9zm6 0c0-.552-.448-1-1-1s-1 .448-1 1v9c0 .552.448 1 1 1s1-.448 1-1v-9zm6-5h-20v-2h6v-1.5c0-.827.673-1.5 1.5-1.5h5c.825 0 1.5.671 1.5 1.5v1.5h6v2zm-12-2h4v-1h-4v1z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  );
                })
              : null}
          </div>
        </div>
      </div>
      <div className="text-center border px-5 py-2 bg-th-accent-light rounded-lg m-5">
        All DB Entries
        <div className="w-full">
          {content2
            ? content2.map((ele, i) => {
                return (
                  <div
                    key={i}
                    className="flex flex-row justify-evenly items-center"
                  >
                    <div className="w-full text-left m-4 p-4">
                      <p className="mb-3">Id: {ele._id}</p>
                      <p>Email: {ele.email}</p>
                      <p>Code: {ele.code}</p>

                      <p>
                        Redeemed: {ele.redeemed === false ? "false" : "true"}
                      </p>

                      <p>Redeemed By: {ele.redeemedBy}</p>
                      <p>Redeemed Tx: {ele.redeemedTx}</p>
                      <p>Redeemed Date: {ele.redeemedAt}</p>
                      <p>Created At: {ele.createdAt}</p>
                      <br />
                      <hr className="w-1/2" />
                    </div>
                    <div>
                      <button onClick={() => deletePost(ele._id)}>
                        <svg
                          width="24"
                          height="24"
                          xmlns="http://www.w3.org/2000/svg"
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          className="fill-th-background"
                        >
                          <path d="M19 24h-14c-1.104 0-2-.896-2-2v-16h18v16c0 1.104-.896 2-2 2m-9-14c0-.552-.448-1-1-1s-1 .448-1 1v9c0 .552.448 1 1 1s1-.448 1-1v-9zm6 0c0-.552-.448-1-1-1s-1 .448-1 1v9c0 .552.448 1 1 1s1-.448 1-1v-9zm6-5h-20v-2h6v-1.5c0-.827.673-1.5 1.5-1.5h5c.825 0 1.5.671 1.5 1.5v1.5h6v2zm-12-2h4v-1h-4v1z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                );
              })
            : null}
        </div>
      </div>
      {/* // DIVIDER BETWEEN COMPONENTS // */}
    </div>
  );
}
