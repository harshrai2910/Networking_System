const express = require("express");
const networkRouter = express.Router();
const networkController = require("../controller/networkController");
const isAuth = require("../middleware/isAuth");

networkRouter.post("/myNetwork", networkController.postRequestTofollow);

networkRouter.get(
  "/myNetwork/connections",
  networkController.getConnectionData,
);

networkRouter.patch(
  "/myNetwork/:id/accepted",
  networkController.patchAcceptedRequestData,
);

networkRouter.patch(
  "/myNetwork/:id/rejected",
  networkController.patchRejectedRequestData,
);

networkRouter.get("/myNetwork/:id/status", networkController.getNetworkStatus);

module.exports = networkRouter;
