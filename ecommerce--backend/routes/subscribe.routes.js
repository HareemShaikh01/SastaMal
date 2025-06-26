const express = require("express");
const {
  getAllSubscribers,
  addSubscribe,
  sendEmails,
  deleteEmail, // ✅ You missed importing this
} = require("../controller/subscribe.controller");

const router = express.Router();

router.post("/add", addSubscribe);
router.get("/all", getAllSubscribers);
router.post("/send", sendEmails);
router.delete("/delete/:id", deleteEmail);

module.exports = router;
