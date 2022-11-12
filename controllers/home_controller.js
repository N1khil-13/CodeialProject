const Post = require('../models/post');
const user = require('../models/user');

module.exports.home = function (req, res) {
    // console.log(req.cookies);

    // Post.find({}, function (err, posts) {

    //     return res.render('home', {
    //         title: "Codeial | Home",
    //         posts: posts    
    //     });
    // });

    // Populating user of each post

    Post.find({}).populate('user').exec(function (err, posts) {
        return res.render('home', {
            title: "Codeial | Home",
            posts: posts
        })
    })


}