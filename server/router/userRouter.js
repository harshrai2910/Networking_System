const express = require("express");
const userRouter = express.Router();
const userController = require("../controller/userController");
const isAuth = require("../middleware/isAuth");
const { upload } = require("../middleware/multer");

userRouter.get("/profile", isAuth, userController.getUserData);

userRouter.post(
  "/profile/complete",
  isAuth,
  upload.single("profile"),
  userController.postCompleteData,
);

userRouter.put("/profile/language", isAuth, userController.postEditLanguage);
userRouter.put(
  "/profile/skills/delete",
  isAuth,
  userController.putDeleteSkills,
);

userRouter.put("/profile/skills/update", isAuth, userController.putUpdateSkill);

module.exports = userRouter;
