const express = require("express");
const router = express.Router();
const User = require("../models/User");
const fooditems = require("../models/Fooditems");
const foodcategory = require("../models/Foodcategory");
const Order = require("../models/Orders");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");

const jwtsecret = process.env.JWTTOKEN;

//Router 1 : Creating user

router.post(
  "/createuser",

  body("name", "Minimumlength is 3").isLength({ min: 3 }),
  body("email", "Wrong email").isEmail(),
  body("password", "Password must be 5 letters").isLength({ min: 5 }),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const salt = await bcrypt.genSalt(10);
    let secpass = await bcrypt.hash(req.body.password, salt);

    try {
      await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secpass,
      });
      res.json({ success: true });
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  }
);

//Router 2 : Login user

router.post(
  "/login",
  [
    body("email", "Wrong email").isEmail(),
    body("password", "Password can not be blank").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let userdata = await User.findOne({ email });
      console.log(userdata);
      if (!userdata) {
        return res.status(400).json({ errors: "Enter correct credentials" });
      }
      const passcompare = bcrypt.compare(password, userdata.password);

      if (!passcompare) {
        return res.status(400).json({ errors: "Enter correct credentials" });
      }

      const data = {
        user: {
          id: userdata.id,
        },
      };

      const authtoken = jwt.sign(data, jwtsecret);

      return res.json({ success: true, authtoken: authtoken });
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  }
);

//Router 3: Displaying food data

router.get("/fooddata", async (req, res) => {
  try {
    const foodit = await fooditems.find({});
    const foodcat = await foodcategory.find({});

    res.send([foodit, foodcat]);
  } catch (error) {
    console.log(error);
    res.send([error]);
  }
});

//Router 4 : Order data

router.post(
  "/orderdata",
  body("email", "Wrong email").isEmail(),
  async (req, res) => {
    let data = req.body.orderdata;
    let useremail = req.body.email;
    console.log(useremail);

    console.log("123", req.body.email);

    //if email not exisitng in db then create: else: InsertMany()
    let eId = await Order.findOne({ email: req.body.email });
    // console.log(eId);

    if (eId === null) {
      try {
        // data.concat("Date");
        // console.log(data);
        console.log("if", req.body.email);
        await Order.create({
          email: req.body.email,
          orderdata: [data],
          // date: new Date(),
        }).then(() => {
          // console.log(email,orderdata);
          res.json({ success: true, orderdata: data });
        });
      } catch (error) {
        console.log(error.message);
        res.status("Server Error").send(error.message);
      }
    } else {
      try {
        console.log("else", req.body.email);
        // orderdata.concat("Date");
        // console.log(data);
        await Order.findOneAndUpdate(
          { email: req.body.email },
          { $push: { orderdata: data } }
        ).then(() => {
          res.json({ success: true, orderdata: data });
        });
      } catch (error) {
        console.log(error.message);
        res.status("Server Error").send(error.message);
      }
    }
  }
);

router.post("/myOrderData", async (req, res) => {
  try {
    console.log(req.body.email);
    let eId = await Order.findOne({ email: req.body.email });
    console.log(eId);
    res.json({ orderData: eId });
  } catch (error) {
    res.send("Error", error.message);
  }
});

module.exports = router;
