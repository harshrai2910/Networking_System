const mongoose = require("mongoose");

const userPostSchema = new mongoose.Schema(
  {
    UserId: { type: mongoose.Schema.Types.ObjectId, ref: "userProfile" },
    content: { type: String, required: true },
    postImage: { type: String, default: "" },
    postPublicId: { type: String, default: "" },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "userProfile" }],
    postImpression: { type: Number },
    moderationStatus: {
      type: String,
      enum: ["pending", "approved"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("userPost", userPostSchema);
