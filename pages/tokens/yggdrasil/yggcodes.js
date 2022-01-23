import { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import Nav from "../../../components/Layout/Nav";

function YggClaim() {
  const [code, setCode] = useState("");
  const [content, setContentFromDb] = useState([]);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState(0);
  const [obj, setObj] = useState(0);
  const [redeemed, setRedeemed] = useState(true);
  const { account, library } = useWeb3React();
  const [formInput, updateFormInput] = useState({
    email: "",
    code: ""
  });

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
    console.log("Test");
    console.log(data.message[0]._id);
    console.log(data.message);
    console.log("TES2");
    console.log({ email: data.message[0].email, code: code });

    updateFormInput({ email: data.message[0].email, code: code });

    if (data.success) {
      // reset the fields and log the data

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
      body: obj
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
      } else {
        // set the error
        return setError(data.message);
      }
    }
  }

  return (
    <div>
      <div className="flex flex-col items-center justify-center  mx-auto text-center">
        <div className="text-center  px-5 py-2   mx-5">
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
                              <p className="w-72 text-center mb-2">
                                Please Ensure The Email Below Is Yours Before
                                Final Redemption:
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
                              className="text-center w-72 font-futura text-xl text-white px-5 py-0.5 pt-0.5 font-light border-2 bg-th-primary-medium border-th-accent-light hover:bg-th-primary-medium"
                            >
                              Redeem Code!
                            </div>
                          </div>
                        ) : (
                          <div>
                            <div className="text-center w-80 font-futura text-xl text-white px-5 py-0.5 pt-0.5 font-light border-2 bg-th-primary-medium border-th-accent-light hover:bg-th-primary-medium">
                              Your Code Has Been Redeemed!
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

export default function AddPost() {
  const [formInput, updateFormInput] = useState({
    email: "",
    code: ""
  });

  const { account } = useWeb3React();

  return (
    <div className="w-full">
      <Nav />
      <YggClaim />
    </div>
  );
}
