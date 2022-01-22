import { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import Nav from "../../../components/Layout/Nav";

export default function AddPost() {
  const [code, setCode] = useState("");
  const [content, setContentFromDb] = useState([]);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState(0);

  const { account } = useWeb3React();

  const getOnePost2 = async () => {
    console.log("Getting your data!");
    console.log(code);

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
    console.log(data.message);

    if (data.success) {
      // reset the fields and log the data

      setContentFromDb(data.message);
    } else {
      // set the error
      return setError(data.message);
    }
  };

  useEffect(() => {}, []);

  return (
    <div className="w-full">
      <Nav />
      <div className="flex flex-col items-center justify-center  mx-auto text-center">
        <div className="text-center border px-5 py-2 bg-th-accent-light rounded-lg m-5">
          <form>
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

            <div className="w-80 mb-2">Enter Code From Email</div>
            <input
              type="text"
              name="code"
              onChange={(e) => setCode(e.target.value)}
              placeholder="Code"
              className="w-80 mb-2"
            />
          </form>
          <button
            onClick={getOnePost2}
            className="w-72 h-8 px-3 py-0.5 border rounded-lg"
          >
            Check Code Against Email
          </button>
        </div>
      </div>
      {/* // DIVIDER BETWEEN COMPONENTS // */}
      <div className="w-full flex flex-row flex-1 mx-auto justify-center text-center">
        <div className="text-center border px-5 py-2 bg-th-accent-light rounded-lg m-5">
          Please Confirm The Email Below Is Yours
          <div className="w-full">
            {content
              ? content.map((ele, i) => {
                  return (
                    <div
                      key={i}
                      className="flex flex-row justify-evenly items-center"
                    >
                      <div className="w-full text-left mx-4 p-4">
                        <p>Email: {ele.email}</p>

                        <br />
                      </div>
                    </div>
                  );
                })
              : null}
          </div>
        </div>
      </div>{" "}
    </div>
  );
}
