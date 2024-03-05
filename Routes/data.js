const express = require('express');
const {delete_Blogs,save_Blog,blogDetails} = require('../controllers/Blogs')
const { users_Mid ,restrictTO,uploadFile} = require('../Middleware/userMiddleware');
const Router = express.Router();
Router.use(express.json());
const upload = uploadFile()
Router.get('/blogdetails',users_Mid,blogDetails)
Router.post('/saveblogs', users_Mid,restrictTO(["ADMIN","MODERATOR"]),upload.single('file'),save_Blog);
Router.delete('/deleteblogs/:_id', users_Mid,restrictTO(["ADMIN","MODERATOR"]),delete_Blogs)
module.exports = Router;
