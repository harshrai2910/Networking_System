const { check, validationResult } = require("express-validator");
const User = require("../model/user");
const UserConnection = require("../model/userConnections.js");
const { uploadToCloudinary } = require("../utils/cloudinaryService.js");

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
  check("firstName").trim().notEmpty().withMessage("First name is required"),

  check("lastName").trim(),

  check("course").trim().notEmpty().withMessage("Course is required"),

  check("gradYear")
    .isInt()
    .notEmpty()
    .withMessage("Valid graduation year is required"),

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

      const {
        firstName,
        lastName,
        course,
        gradYear,
        headline,
        about,
        achievements,
      } = req.body;

      const cloudinaryResult = await uploadToCloudinary(
        req.file.buffer,
        "user_profile_img",
      );
      const skills = JSON.parse(req.body.skills);
      const links = JSON.parse(req.body.links);

      await User.findByIdAndUpdate(
        userId,
        {
          isProfileComplete: true,
          firstName,
          lastName,
          course,
          gradYear,
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

  const updatedLanguage = await User.findByIdAndUpdate(
    id,
    { $set: { language } },
    { returnDocument: "after" },
  ).select("language");

  return res.json({ language: updatedLanguage });
};

exports.putDeleteSkills = async (req, res, next) => {
  try {
    const { skill } = req.body;
    const id = req.session.user.userId;

    const updatedSkills = await User.findByIdAndUpdate(
      id,
      {
        $pull: { skills: skill },
      },
      { returnDocument: "after" },
    ).select("skills");

    res.status(200).json({ updatedSkills: updatedSkills.skills });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

exports.putUpdateSkill = async (req, res, next) => {
  const { skills } = req.body;
  const id = req.session.user.userId;

  const updatedSkills = await User.findByIdAndUpdate(
    id,
    { skills },
    { returnDocument: "after" },
  ).select("skills");

  return res.json({ updatedSkills: updatedSkills.skills });
};

exports.putUpdateLinks = [
  check("github").optional().isURL().withMessage("only URL are allowed"),
  check("linkedin").optional().isURL().withMessage("only URL are allowed"),
  check("twitter").optional().isURL().withMessage("only URL are allowed"),

  async (req, res, next) => {
    try {
      const result = validationResult(req);
      if (!result.isEmpty()) {
        return res.status(400).json({ error: result.array() });
      }

      const id = req.session.user.userId;
      const links = req.body;

      const updatedLinks = await User.findByIdAndUpdate(
        id,
        { $set: { links } },
        { returnDocument: "after" },
      ).select("links");

      return res.status(200).json({ updatedLinks: updatedLinks.links });
    } catch (error) {
      return res.status(500).json({ error });
    }
  },
];

exports.putUpdateAchievements = async (req, res, next) => {
  try {
    const id = req.session.user.userId;
    const { achievements } = req.body;

    const updatedAchievements = await User.findByIdAndUpdate(
      id,
      { $set: { achievements } },
      { returnDocument: "after" },
    ).select("achievements");

    return res
      .status(200)
      .json({ updatedAchievements: updatedAchievements.achievements });
  } catch (error) {
    return res.status(500).json({ error });
  }
};
