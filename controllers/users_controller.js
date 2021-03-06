const express = require("express");
const User = require("../models/users");
const bcrypt = require("bcrypt");

const router = express.Router();

router.get("/"),
  (req, res) => {
    // console.log(req.session.userId);
    console.log(req, res);
    User.finduserByUserId(userId).then((user) =>
      console.log("the user is: ", user)
    );
  };

//log user out
router.delete("/", (req, res) => {
  req.session.userId = undefined;
  res.json({ message: "you have logged out" });
});

router.post("/", (req, res) => {
  const passwordDigest = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
  };

  // Collect all the user information from the axios post request
  const { firstName, lastName, userName, email, password } = req.body;

  // Hash user's password with the function created above
  const password_hash = passwordDigest(req.body.password);

  User.create(userName, firstName, lastName, email, password_hash).then(
    (userName) => res.json(userName)
  );
});

module.exports = router;
