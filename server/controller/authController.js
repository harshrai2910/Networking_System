const { check, validationResult } = require("express-validator");
const User = require("../model/user");
const bcrypt = require("bcrypt");

exports.postSignup = [
  check("username")
    .trim()
    .notEmpty()
    .withMessage("username is required")
    .isLength({ min: 3, max: 30 })
    .withMessage("username should be between 3 and 30 characters"),

  check("email").trim().isEmail().withMessage("enter a valid email"),

  check("password")
    .trim()
    .isLength({ min: 6 })
    .withMessage("Password must be 6 chars"),

  check("confirmPassword")
    .trim()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("password dosen't match");
      }
      return true;
    }),

  async (req, res, next) => {
    const { username, email, password } = req.body;
    const result = validationResult(req);

    if (!result.isEmpty()) {
      return res.status(400).json({ error: result.array().map((err) => err) });
    }

    const saltRounds = 10;
    bcrypt.hash(password, saltRounds, async (err, hashedPassword) => {
      if (!err) {
        const user = new User({
          username,
          email,
          password: hashedPassword,
        });
        await user.save();
        return res.json({ signup: true });
      }
      return res.json({ signup: false });
    });
  },
];

exports.postLogin = async (req, res, _) => {
  const { identity, password, identifier } = req.body;
  console.log(req.body);
  let user = {};

  if (identity === "email") {
    user = await User.findOne({ email: identifier }); // based on email
  } else {
    user = await User.findOne({ username: identifier }); // basde on username
  }

  if (!user) {
    return res.json({ msg: "email/username or password dosen't match!" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.json({ msg: "email/username or password dosen't match!" });
  }

  req.session.isLoggedIn = true;
  req.session.user = {
    userId: user._id.toString(),
  };
  return res.status(200).json({ isLoggedIn: true });
};

exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
    }
    res.clearCookie("connect.sid").json({ msg: "logout successfully" });
  });
};

exports.getAuthStatus = (req, res, next) => {
  if (req.session.isLoggedIn) {
    return res
      .status(200)
      .json({ isLoggedIn: true, userId: req.session.userId });
  } else {
    return res.status(200).json({ isLoggedIn: false });
  }
};

exports.statusOfUserName = async (req, res) => {
  try {
    const username = req.params.username;
    const userdata = await User.find().select("username");
    let existsUsername = userdata.some((user) => user.username === username);

    return res.json({ status: existsUsername });
  } catch (err) {
    return res.status(500).json({ error: "Internal server error" });
  }
};
