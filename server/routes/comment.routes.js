const express = require("express");
const auth = require("../middleware/auth.middleware");
const Comment = require("../models/Comment");
const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(auth, async (req, res) => {
    try {
      const { orderBy, equalTo } = req.body;
      const list = await Comment.find({ [orderBy]: equalTo });
      res.send(list);
    } catch (error) {
      return res.status(500).json({
        message: "На сервере произошла ошибка. Попробуйте позже.",
      });
    }
  })
  .post(auth, async (req, res) => {
    try {
      const newComment = await Comment.create({
        ...req.body,
        userId: req.user._id,
      });
      res.status(201).send(newComment);
    } catch (error) {
      return res.status(500).json({
        message: "На сервере произошла ошибка. Попробуйте позже.",
      });
    }
  });

router.delete("/:commentId", auth, async (req, res) => {
  try {
    const { commentId } = req.params;
    const removeComment = await Comment.findById(commentId);

    if (removeComment.userId.toString() === req.user._id) {
      await removeComment.remove();
      return res.send(null);
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    return res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже.",
    });
  }
});

module.exports = router;
