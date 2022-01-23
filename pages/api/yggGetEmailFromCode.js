// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import moment from "moment";

let date = moment(Date.now()).format("LLLL");

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
  const { code1 } = req.body.code;
  console.log(code1);
  try {
    let { db } = await connectToDatabase();
    let posts = await db.collection("yggcodes").find().toArray();
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
    let posts = await db
      .collection("yggcodes")
      .find({ code: JSON.parse(req.body) })
      .toArray();
    console.log(posts);

    if (posts.length < 1) {
      return res.json({
        message: "No Code",
        success: true
      });
    } else {
      return res.json({
        message: JSON.parse(JSON.stringify(posts)),
        success: true
      });
    }
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

    let { content, account } = JSON.parse(req.body);

    console.log("posts1");
    console.log(content[0]._id);

    await db.collection("yggcodes").updateOne(
      {
        _id: new ObjectId(content[0]._id)
      },
      { $set: { redeemed: true, redeemedBy: account, redeemedAt: date } }
    );

    let posts = await db
      .collection("yggcodes")
      .find({ _id: content[0]._id })
      .toArray();
    console.log("posts2");

    return res.json({
      message: posts,
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
