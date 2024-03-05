const express = require('express');
const { addComment, displayComments , deleteComments} = require('../controllers/comments');
const { users_Mid} = require('../Middleware/userMiddleware');
const Router = express.Router();  
Router.use(express.json()) 
Router.use(users_Mid)
Router.route('/comment/:_id')
.post( addComment)
.get(displayComments)
.delete(deleteComments);
module.exports = Router;
