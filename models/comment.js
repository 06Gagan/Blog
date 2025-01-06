const { Schema, model } = require('mongoose');

const commentSchema = new Schema({
  content: {
    type: String,
    required: true
  },
  blogId: {
    type: Schema.Types.ObjectId,
    ref: 'blog'
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    // Changed from 'user' to 'User' to match the actual model name
    ref: 'User'
  }
}, { timestamps: true });

const Comment = model('comment', commentSchema);

module.exports = Comment;
