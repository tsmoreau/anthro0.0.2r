// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const { connectToDatabase } = require("../../lib/mongodb");
const ObjectId = require("mongodb").ObjectId;

export default async function handler(req, res) {
  // switch the methods
  switch (req.method) {
    case "GET": {
      return getCodes(req, res);
    }

    case "POST": {
      return addCode(req, res);
    }

    case "PUT": {
      return redeemCode(req, res);
    }

    case "DELETE": {
      return deleteCode(req, res);
    }
    default:
      console.log("Hello Ygg Codes!");
  }
}

// Getting all posts.
async function getCodes(req, res) {
  try {
    let { db } = await connectToDatabase();
    let posts = await db
      .collection("yggcodes")
      .find(req.body)
      .sort({ redeemed: -1 })
      .toArray();
    return res.json({
      message: JSON.parse(JSON.stringify(posts)),
      success: true
    });
  } catch (error) {
    return res.json({
      message: new Error(error).message,
      success: false
    });
  }
}

// Getting one posts.
async function getOneCode(req, res) {
  try {
    let { db } = await connectToDatabase();
    let posts = await db
      .collection("yggcodes")
      .find({ email: "test" })
      .sort({ redeemed: -1 })
      .toArray();
    return res.json({
      message: JSON.parse(JSON.stringify(posts)),
      success: true
    });
  } catch (error) {
    return res.json({
      message: new Error(error).message,
      success: false
    });
  }
}

// Adding a new code
async function addCode(req, res) {
  try {
    let { db } = await connectToDatabase();
    await db.collection("yggcodes").insertOne(JSON.parse(req.body));
    return res.json({
      message: "Code Added Successfully",
      success: true
    });
  } catch (error) {
    return res.json({
      message: new Error(error).message,
      success: false
    });
  }
}

// Updating a code
async function redeemCode(req, res) {
  try {
    let { db } = await connectToDatabase();

    await db.collection("yggcodes").updateOne(
      {
        _id: new ObjectId(req.body)
      },
      { $set: { redeemed: true } }
    );

    return res.json({
      message: "Code redeemed successfully",
      success: true
    });
  } catch (error) {
    return res.json({
      message: new Error(error).message,
      success: false
    });
  }
}

// deleting a code
async function deleteCode(req, res) {
  try {
    let { db } = await connectToDatabase();

    await db.collection("yggcodes").deleteOne({
      _id: new ObjectId(req.body)
    });

    return res.json({
      message: "Code deleted successfully",
      success: true
    });
  } catch (error) {
    return res.json({
      message: new Error(error).message,
      success: false
    });
  }
}
