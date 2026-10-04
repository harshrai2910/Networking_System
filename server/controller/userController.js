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

exports.putUpdateProfile = [
  check("firstName").trim().notEmpty().withMessage("First name is required"),

  check("lastName").trim(),

  check("course").trim().notEmpty().withMessage("Course is required"),

  check("gradYear")
    .isInt()
    .notEmpty()
    .withMessage("Valid graduation year is required"),

  check("clgName").trim(),
  check("headline").trim(),
  check("about").trim(),

  async (req, res, next) => {
    try {
      const id = req.session.user.userId;

      const {
        firstName,
        lastName,
        course,
        gradYear,
        clgName,
        headline,
        about,
      } = req.body;

      if (!req.file) {
        const updatedProfile = await User.findByIdAndUpdate(
          id,
          {
            firstName,
            lastName,
            course,
            gradYear,
            clgName,
            headline,
            about,
          },
          { returnDocument: "after" },
        );
        return res.status(200).json({ updatedProfile: updatedProfile });
      }

      const cloudinaryResult = await uploadToCloudinary(
        req.file.buffer,
        "user_profile_img",
      );

      const updatedProfile = await User.findByIdAndUpdate(
        id,
        {
          firstName,
          lastName,
          course,
          gradYear,
          clgName,
          headline,
          about,
          profile: cloudinaryResult.secure_url,
          profilePublicId: cloudinaryResult.public_id,
        },
        { returnDocument: "after" },
      );

      return res.status(200).json({ updatedProfile: updatedProfile });
    } catch (err) {
      return res.status(500).json({ err });
    }
  },
];

exports.totalProfileView = async (req, res, _) => {
  try {
    const userId = req.session.user.userId;

    const userProfileData = await User.findById(userId).populate(
      "ProfileViews",
      "firstName lastName headline profile",
    );

    return res.status(200).json({ ProfileViews: userProfileData.ProfileViews });
  } catch (err) {
    return res.status(200).json({ err });
  }
};
