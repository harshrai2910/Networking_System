const express = require("express");
const userRouter = express.Router();
const userController = require("../controller/userController");
const isAuth = require("../middleware/isAuth");
const { upload } = require("../middleware/multer");

userRouter.get("/profile", isAuth, userController.getUserData);

userRouter.put("/profile/language", isAuth, userController.postEditLanguage);

userRouter.put(
  "/profile/skills/delete",
  isAuth,
  userController.putDeleteSkills,
);

userRouter.put("/profile/skills/update", isAuth, userController.putUpdateSkill);

userRouter.put("/profile/links/update", isAuth, userController.putUpdateLinks);

userRouter.put(
  "/profile/achievements/update",
  isAuth,
  userController.putUpdateAchievements,
);

userRouter.put(
  "/profile/update",
  isAuth,
  upload.single("profile"),
  userController.putUpdateProfile,
);

userRouter.put(
  "/profile/views",
  isAuth,
  upload.single("profile"),
  userController.totalProfileView,
);

module.exports = userRouter;
