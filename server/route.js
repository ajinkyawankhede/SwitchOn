var express = require("express");
var router = express.Router();
const app = express();
const Authenticate = require("./middleware/index");

const User = require("./api/user");
const Forms = require("./api/formRequest");
const Notification = require("./api/notification");

router.post("/signUp", User.signUp);
router.post("/login", User.login);

router.get("/getUsersList", Authenticate.user, Forms.getUsers);
router.post("/submitForm", Authenticate.user, Forms.saveForms);
router.get("/pendingForms", Authenticate.user, Forms.pendingRequests);
router.get("/acceptedForms", Authenticate.user, Forms.approvedForms);
router.get("/rejectedForms", Authenticate.user, Forms.rejectedForms);
router.post("/acceptRequest", Authenticate.user, Forms.approveRequest);
router.post("/rejectRequest", Authenticate.user, Forms.rejectRequest);

router.post("/approvalNotification", Notification.approvalNotification);
router.post("/acceptedNotification", Notification.acceptedNotification);
router.post("/rejectedNotification", Notification.rejectedNotification);

router.get(
  "/notificationsCount",
  Authenticate.user,
  Notification.countNotifications
);
router.get("/notifications", Authenticate.user, Notification.getNotifications);
router.get("/markAsRead", Authenticate.user, Notification.markRead);

module.exports = router;
