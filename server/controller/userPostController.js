const { check, validationResult } = require("express-validator");
const UserConnection = require("../model/userConnections");
const UserPost = require("../model/userPost");
const { uploadToCloudinary } = require("../utils/cloudinaryService.js");
const cloudinary = require("../config/cloudinary.js");
const { GoogleGenAI } = require("@google/genai");
require("dotenv").config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API });

exports.createPost = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Post Image not provided" });
    }

    const id = req.session.user.userId;
    const { content } = req.body;
    console.log("AI review Started");

    console.time("AI");

    const interaction = await ai.interactions.create({
      model: "gemini-3.5-flash-lite",
      input: [
        {
          type: "text",
          text: `Act as a strict content moderator for a student app. Block any sexual, explicit, nude, or hateful content
                Content: ${content}
                Respond ONLY in JSON: {"flag": boolean, "action": "ALLOW" | "BLOCK", "reason": string(7-8 words) | null}`,
        },
        {
          type: "image",
          data: req.file.buffer.toString("base64"),
          mime_type: req.file.mimetype,
        },
      ],
    });

    console.timeEnd("AI");
    const cleanOutput = interaction.output_text
      .replace(/```json\s*/i, "")
      .replace(/```\s*$/, "")
      .trim();

    const AI_Review = JSON.parse(cleanOutput);

    console.log(AI_Review);

    if (!AI_Review.flag && AI_Review.action === "ALLOW") {
      console.time("cloud");
      const cloudinaryResult = await uploadToCloudinary(
        req.file.buffer,
        "user_post_img",
      );

      console.timeEnd("cloud");

      console.time("Database");

      const userPost = new UserPost({
        UserId: id,
        content,
        postImage: cloudinaryResult.secure_url,
        postPublicId: cloudinaryResult.public_id,
      });

      await userPost.save();

      console.timeEnd("Database");

      return await res
        .status(200)
        .json({ post: userPost, action: AI_Review.action });
    } else {
      return await res
        .status(200)
        .json({ reason: AI_Review.reason, action: AI_Review.action });
    }
  } catch (error) {
    console.error("Profile Completion Error:", error);
    return res.status(500).json({ error: error.message || "Server Error" });
  }
};

exports.getPosts = async (req, res, next) => {
  const id = req.session.user.userId;
  const posts = await UserPost.find({ UserId: id }).sort({ createdAt: -1 });

  return res.status(200).json({ post: posts });
};

exports.deletePost = async (req, res, next) => {
  try {
    const { delId } = req.body;

    const post = await UserPost.findOne({ _id: delId });
    const public_id = post.postPublicId;

    await cloudinary.uploader.destroy(public_id, { invalidate: true });

    await UserPost.findOneAndDelete({ _id: delId });

    return res.status(201).json({ status: "post created" });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

exports.getAllPosts = async (req, res, next) => {
  const currentUserId = req.session.user.userId;
  const posts = await UserPost.find()
    .limit(20)
    .lean()
    .populate("UserId")
    .sort({ createdAt: -1 });

  const totalConnection = await UserConnection.find({
    status: "accepted",
    $or: [{ sender: currentUserId }, { receiver: currentUserId }],
  });

  const connectedIds = totalConnection.map((conn) =>
    currentUserId === conn.receiver.toString()
      ? conn.sender.toString()
      : conn.receiver.toString(),
  );

  const usersPost = posts.map((post) => ({
    ...post,
    isFollowing: connectedIds.includes(post.UserId._id.toString()),
  }));

  return res.json({ usersPost });
};

exports.putLikePost = async (req, res, next) => {
  const userId = req.session.user.userId;
  const postId = req.params.postId;

  const post = await UserPost.findById(postId);

  if (!post.likes.includes(userId)) {
    post.likes.push(userId);
  } else {
    post.likes.pull(userId);
  }

  await post.save();

  return res.status(200).json({ likes: post.likes, postId: post._id });
};
