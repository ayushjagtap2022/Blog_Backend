// controllers/comments.js

const mongoose = require('mongoose');
const comment = require('../models/commentSchema');

const addComment = async (req, res) => {
  try {
    let userId = req.userData.payload.user._id;
    let userName = req.userData.payload.user.name;
    const comments = new comment({ userId: userId, userName:userName,comment: req.body.comment, blogId: req.params._id.trim()});

    if (!comments) {
      res.status(401).send({ Error: "Invalid Credentials" });
      return;
    }

    comments.save()
      .then(userComment => res.status(201).send(userComment))
      .catch(err => res.status(422).send({ Error: err }));
  } catch (err) {
    res.status(500).send({ Error: "Internal Server Error"+err });
  }
};

const displayComments = async (req, res) => {
  try {
    const displayQuery = await comment.find({ blogId: req.params._id.trim()});

    if (!displayQuery) {
      res.status(422).send({ Error: "Error while displaying comments" });
    } else {
      res.status(200).send(displayQuery);
    }
  } catch (err) {
    res.status(500).send({ Error: "Internal Server Error"+err });
  };
  }
 
  const deleteComments = async (req, res) => {
    try {
      const commentId = req.params._id.trim();
      const userId = req.body.userId;
  
      const deleteQuery = await comment.findOneAndDelete({
        _id: commentId,
        userId: userId,
      });
  
      if (!deleteQuery) {
        res.status(422).send({ Error: "Comment not found" });
      } else {
        res.status(200).send(deleteQuery);
      }
    } catch (err) {
      res.status(500).send({ Error: "Internal Server Error"});
    }
  };

module.exports = { addComment, displayComments ,deleteComments};
