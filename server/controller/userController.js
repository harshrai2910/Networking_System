const { check, validationResult } = require("express-validator");
const User = require("../model/user");
const UserConnection = require("../model/userConnections.js");
const uploadToCloudinary = require("../utils/cloudinaryService.js");

exports.getUserData = async (req, res, next) => {
  if (req.session.isLoggedIn) {
    const userId = req.session.user.userId;
    const data = await User.findOne({ _id: userId }).lean();

    const totalConnection = await UserConnection.find({
      status: "accepted",
      $or: [{ sender: userId }, { receiver: userId }],
    });

    const userData = {
      ...data,
      connections: totalConnection.length,
    };

    return res.status(200).json(userData);
  }
};

exports.postCompleteData = [
  check("headline").trim(),
  check("about").trim(),
  check("links.github").optional().isURL().withMessage("only URL are allowed"),
  check("links.linkedin")
    .optional()
    .isURL()
    .withMessage("only URL are allowed"),
  check("links.twitter").optional().isURL().withMessage("only URL are allowed"),

  check("achievements").trim(),

  async (req, res, next) => {
    try {
      const result = validationResult(req);
      if (!result.isEmpty()) {
        return res.status(400).json({ errors: result.array() });
      }

      if (!req.file) {
        return res.status(400).json({ message: "No profile image provided" });
      }

      const userId = req.session.user.userId;

      const { headline, about, achievements } = req.body;
      const cloudinaryResult = await uploadToCloudinary(
        req.file.buffer,
        "user_profile_img",
      );
      const skills = JSON.parse(req.body.skills);
      const links = JSON.parse(req.body.links);

      if (!result.isEmpty()) {
        return res.status(400).json(result.array());
      }

      await User.findByIdAndUpdate(
        userId,
        {
          isProfileComplete: true,
          headline,
          about,
          links,
          achievements,
          skills,
          profile: cloudinaryResult.secure_url,
          profilePublicId: cloudinaryResult.public_id,
        },
        { returnDocument: "after" },
      );

      return res.status(200).json({ completed: true });
    } catch (error) {
      console.error("Profile Completion Error:", error);
      return res.status(500).json({ error: error.message || "Server Error" });
    }
  },
];

exports.postEditLanguage = async (req, res, next) => {
  const { language } = req.body;

  const id = req.session.user.userId;

  await User.findByIdAndUpdate(
    id,
    {
      language,
    },
    { returnDocument: "after" },
  );

  console.log(language);

  return res.json({ language: language });
};

exports.putDeleteSkills = async (req, res, next) => {
  const { skill } = req.body;
  const id = req.session.user.userId;

  console.log(skill);

  await User.findByIdAndUpdate(
    id,
    {
      $pull: { skills: skill },
    },
    { returnDocument: "after" },
  );

  res.status(200).json("deleted successfull");
};

exports.putUpdateSkill = async (req, res, next) => {
  const { skills } = req.body;
  const id = req.session.user.userId;

  await User.findByIdAndUpdate(id, { skills }, { returnDocument: "after" });

  return res.json("updated Successfully");
};
