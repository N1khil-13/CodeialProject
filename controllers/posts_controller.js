const Post = require('../models/post');
const Comment = require('../models/comment');
const Like = require('../models/like');


module.exports.create = async function (req, res) {

    try {
        let post = await Post.create({
            content: req.body.content,
            user: req.user._id
        });

        if (req.xhr) {

            post = await post.populate('user', 'name');

            return res.status(200).json({
                data: {
                    post: post
                },
                message: "Post created!"
            });
        }
        req.flash('success', 'Post published!');

        return res.redirect('back');
    } catch (error) {
        // console.log("Error", error);
        req.flash('error', error);

        console.log(error);
        return res.redirect('back');

    }



}

module.exports.destroy = async function (req, res) {
    // console.log('success');
    // if (err) {
    //     console.log('Error in deleting post');
    // }

    try {
        let post = await Post.findById(req.params.id);

        console.log(post.user);
        console.log(req.user.id);

        if (post.user == req.user.id) {

            console.log('success');

            await Like.deleteMany({ likeable: post, onModel: 'Post' });

            console.log('success2');

            await Like.deleteMany({ _id: { $in: post.comments } });

            post.remove();



            await Comment.deleteMany({ post: req.params.id });

            // console.log('success2');

            if (req.xhr) {
                console.log(req.params.id);
                return res.status(200).json({
                    data: {
                        post_id: req.params.id,
                    },
                    message: 'Post deleted'
                });
            }

            req.flash('success', 'Post deleted!');

            return res.redirect('back');

        } else {
            req.flash('error', 'You cannot delete this post!');

            return res.redirect('back');
        }
    } catch (err) {
        req.flash('error', err);
        console.log("Error", err);
        return res.redirect('back');
    }



}