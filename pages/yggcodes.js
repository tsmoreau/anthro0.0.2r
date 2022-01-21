import { useState } from "react";

import Nav from "../components/Layout/Nav";

export default function AddPost() {
  const [code, setCode] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handlePost = async (e) => {
    e.preventDefault();

    // reset error and message
    setError("");
    setMessage("");

    // fields check
    if (!code) return setError("All fields are required");

    // post structure
    let codeData = {
      code,
      redeemed: false,
      redeemedBy: "null",
      redeemedAt: "null",
      createdAt: new Date().toISOString()
    };
    // save the post
    let response = await fetch("/api/yggcodes", {
      method: "POST",
      body: JSON.stringify(codeData)
    });

    // get the data
    let data = await response.json();

    if (data.success) {
      // reset the fields
      setCode("");
      // set the message
      return setMessage(data.message);
    } else {
      // set the error
      return setError(data.message);
    }
  };

  return (
    <div className="w-full">
      <Nav />
      <div className="flex justify-center  mx-auto text-center">
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
      <div className="w-full  flex mx-auto justify-center text-center">
        <div className="text-center border px-5 py-2 bg-th-accent-light rounded-lg m-5">
          Upload Code Array (Auto)
          <div className="">
            <button className="px-3 py-1 border rounded mt-2 hover:bg-th-background">
              Upload Codes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
