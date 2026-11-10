const { check, validationResult } = require("express-validator");
const UserConnection = require("../model/userConnections");
const UserPost = require("../model/userPost");
const { uploadToCloudinary } = require("../service/cloudinaryService.js");
const { moderateImage } = require("../service/moderationService.js");
const cloudinary = require("../config/cloudinary.js");

exports.createPost = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Post Image not provided" });
    }

    const id = req.session.user.userId;
    const { content } = req.body;

    console.time("cloudinary:");

    const cloudinaryResult = await uploadToCloudinary(
      req.file.buffer,
      "user_post_img",
    );
    console.timeEnd("cloudinary:");

    console.time("Database:");

    const userPost = new UserPost({
      UserId: id,
      content,
      postImage: cloudinaryResult.secure_url,
      postPublicId: cloudinaryResult.public_id,
    });

    await userPost.save();
    console.timeEnd("Database:");

    moderateImage({
      postId: userPost._id,
      img: req.file,
      content: content,
      public_id: userPost.postPublicId,
    });

    return await res.status(200).json({ created: true });
  } catch (error) {
    console.error("Profile Completion Error:", error);
    return res
      .status(500)
      .json({ error: error.message || "Server Error", created: false });
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
  const { skip } = req.params;
  const limit = 5;
  const currentUserId = req.session.user.userId;
  const posts = await UserPost.find()
    .skip(Number(skip))
    .limit(limit)
    .lean()
    .populate("UserId")
    .sort({ createdAt: -1 });

  let hasMore = posts.length == limit;

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

  return res.json({ usersPost: usersPost, hasMore });
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

exports.recordPostImpression = async (req, res, next) => {
  try {
    const { postId } = req.params;
    await UserPost.findByIdAndUpdate(postId, { $inc: { postImpression: 1 } });
    return res.status(200).json({ flag: "success" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ err });
  }
};

exports.getPostAnalytics = async (req, res, _) => {
  try {
    const userId = req.session.user.userId;

    const post = await UserPost.find({ UserId: userId }).select(
      "postImpression",
    );

    const n = post.reduce((total, post) => total + post.postImpression, 0);
    let postImpression = "";
    if (n >= 1000 && n < 1000000) {
      let newN = n / 1000;
      postImpression = newN.toFixed(1) + "k";
    } else {
      postImpression = n.toString();
    }

    const totalPostCount = post.length;
    return res
      .status(200)
      .json({ totalPostImpression: postImpression, totalPostCount });
  } catch (err) {
    return res
      .status(500)
      .json({ msg: "error occured in fetching post analytics" });
  }
};
