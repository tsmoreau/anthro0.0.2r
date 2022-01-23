import { utils } from "ethers";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    // Unsupported method
    return res.status(405).json({});
  }

  const { account, formInput } = req.body;
  console.log("tes");
  console.log(req.body);

  let autotaskResponse = await fetch(
    `https://api.defender.openzeppelin.com/autotasks/${process.env.AUTOTASK_SECRET_WEBHOOK}`,
    {
      method: "POST",
      body: JSON.stringify({
        // Autotask webhook expects a JSON string in the request's body
        account: account,
        formInput: formInput,
        headers: { "Content-Type": "application/json" }
      })
    }
  );

  if (!autotaskResponse.ok) {
    return res.status(autotaskResponse.status).json({});
  }
  // Response's JSON fields documented at https://docs.openzeppelin.com/defender/autotasks#webhook-handler
  const autotaskResult = await autotaskResponse.json();

  if (autotaskResult.status === "success") {
    const { result } = autotaskResult;
    console.log("weggwfgewfwefwefw");
    return res.status(200).json({ result });
  } else {
    console.error(
      `Autotask run failed with result ${JSON.stringify(autotaskResult)}`
    );
    return res.status(500).json({});
  }
}
