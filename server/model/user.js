const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String },
    lastName: { type: String },
    clgName: { type: String, lowercase: true, trim: true },
    course: { type: String },
    gradYear: { type: Number },
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    email: { type: String, unique: true },
    password: { type: String, required: true },
    isProfileComplete: { type: Boolean, default: false },

    headline: { type: String },
    about: { type: String },
    skills: [{ type: String }],

    links: {
      github: { type: String },
      linkedin: { type: String },
      twitter: { type: String },
    },

    achievements: { type: String },
    profile: { type: String, default: "" },
    profilePublicId: { type: String, default: "" },
    language: [{ type: String }],
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("userProfile", userSchema);
