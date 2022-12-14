// const { populate } = require('../models/comment');
// const Comment = require('../models/comment');
const Post = require('../models/post');
const User = require('../models/user');

module.exports.home = async function (req, res) {
    // console.log(req.cookies);

    // Post.find({}, function (err, posts) {

    //     return res.render('home', {
    //         title: "Codeial | Home",
    //         posts: posts    
    //     });
    // });

    // Populating user of each post

    try {

        let posts = await Post.find({})
            .sort({ createdAt: -1 })
            .populate('user')
            .populate({
                path: 'comments',
                populate: {
                    path: 'user'
                }
            });
        // console.log(posts);
        let users = await User.find({});


        return res.render('home', {
            title: "Codeial | Home",
            posts: posts,
            all_users: users
        });


    } catch (err) {
        console.log('Error', err);
        return;
    }






}