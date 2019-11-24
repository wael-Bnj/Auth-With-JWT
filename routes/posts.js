const router = require('express').Router();
const verify = require('./verifyToken');
const Post = require('../models/Post');
const User = require('../models/User')


router.post('/addPost/:id', async (req, res) => {
    user = req.params;
    id = user.id;
    const { title, subtitle } = req.body;
    const post = await Post.create({
        title,
        subtitle,
        user: id
    });

    await post.save();

    const userById = await User.findById(id)
    userById.posts.push(post)
    //userById.posts.push(post);
    await userById.save();

    return res.send(userById);

});


router.get('/getAllPost', async (req,res)=>{
    await  Post.find(function(err,Post){
    res.json(Post);
  }) 
});


router.get('/userByPost/:id', async (req, res) => {
    const { id } = req.params;
    const userByPost = await Post.findById(id).populate('user');
    res.send(userByPost);

});


/*
router.get('/',verify,(req,res)=>{
    res.json(
        {posts:{
            titre:'the first post',
            description:'data'
    }});
});
*/



module.exports=router;