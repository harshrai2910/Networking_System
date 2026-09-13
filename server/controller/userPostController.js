const { check, validationResult } = require("express-validator");
const UserConnection = require("../model/userConnections");
const UserPost = require("../model/userPost");
const User = require("../model/user");
const path = require("path");
const fs = require("fs");
const { uploadToCloudinary } = require("../utils/cloudinaryService.js");

exports.createPost = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Post Image not provided" });
    }

    const id = req.session.user.userId;
    const { content } = req.body;
    const cloudinaryResult = await uploadToCloudinary(
      req.file.buffer,
      "user_post_img",
    );

    console.log("postImage: ", cloudinaryResult.secure_url);

    const userPost = new UserPost({
      UserId: id,
      content,
      postImage: cloudinaryResult.secure_url,
      postPublicId: cloudinaryResult.public_id,
    });

    await userPost.save();

    return await res.status(200).json({ post: userPost });
  } catch (error) {
    console.error("Profile Completion Error:", error);
    return res.status(500).json({ error: error.message || "Server Error" });
  }
};

exports.getPosts = async (req, res, next) => {
  const id = req.session.user.userId;
  const posts = await UserPost.find({ UserId: id });

  return res.status(200).json({ post: posts });
};

exports.deletePost = async (req, res, next) => {
  try {
    const { delId } = req.body;
    const post = await UserPost.findOne({ _id: delId });
    const { postImage } = post;

    if (!postImage) {
      return res.json("post image does not exist");
    }

    const rootdir = require("../utils/pathUtils");
    const imagePath = path.join(rootdir, "uploads/post", postImage);

    fs.unlinkSync(imagePath);
    await UserPost.findByIdAndDelete(delId);

    return res.json("post deleted successfully");
  } catch (err) {
    console.log(err);
    return res.status(500).json("Something went wrong");
  }
};

exports.getAllPosts = async (req, res, next) => {
  const currentUserId = req.session.user.userId;
  const posts = await UserPost.find().limit(20).lean().populate("UserId");

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

  const post = await UserPost.findById(postId).populate("UserId");

  if (!post.likes.includes(userId)) {
    post.likes.push(userId);
  } else {
    post.likes.pull(userId);
  }

  await post.save();

  return res.json(post);
};

exports.putFollowers = async (req, res, next) => {
  const { userId } = req.params;
  const id = req.session.user.userId;

  const user = await User.findById(id);

  if (!user.following.includes(userId)) {
    user.following.push(userId);
  } else {
    user.following.pull(userId);
  }

  await user.save();

  return res.json("followed");
};
