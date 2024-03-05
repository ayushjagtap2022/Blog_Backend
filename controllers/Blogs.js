const Blogs = require('../models/blogSchema');
const blogDetails=async (req,res) => {
    try{
      //  let userId = req.userData.payload.user._id;
       let findDetails = await Blogs.find({})
       if(!findDetails){
           res.send(400).send({Error:"Result not found"})
       }else{
           res.send(findDetails)
       }
    }catch(err){
       res.status(500).send({ Error: err+"lol"});
    }
   }
   const save_Blog =  async (req, res) => {
    try {
      let userId = req.userData.payload.user._id;
      const requiredFields = ['title', 'description',];
      for (const field of requiredFields) {
        if (!req.body[field]) {
          return res.status(400).send({ Error: `Missing required field: ${field}` });
        }
      } if (!req.file) {
        return res.status(400).send('No file uploaded.');
      }
      const createBlog = new Blogs({
        user: userId,
        title: req.body.title,
        description: req.body.description,
        thumbnail:  req.file.filename
      });
      await createBlog.save().then((result)=>{
        req.blogId = result._id
          res.status(201).send(result);
      });
  } catch (error) {
      res.status(500).send({ Error: error.message });
    }
  }
  const delete_Blogs  = async (req, res) => {
    try {
          let deletedetail_query = await Blogs.findByIdAndDelete(req.params._id.trim())
          if (!deletedetail_query) {
            console.log(deletedetail_query)
                res.status(400).send({ Error: "User not found" });
          } else {
                res.status(200).send(deletedetail_query)
          }
    } catch (error) {
          res.status(500).send({ Error: "Internal Server Error"+error })
    }
}
   module.exports = {save_Blog,blogDetails,delete_Blogs}