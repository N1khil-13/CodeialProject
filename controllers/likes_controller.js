const Like = require('../models/like');
const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.toggleLike = async function (req, res) {
    try {
        // Likes/toggle/id=xyz123&type

        let likeable;
        let deleted = false;


        if (req.query.type = post) {
            likeable = await Post.findById(req.query.id).populate('likes');
        } else {
            likeable = await Comment.findById(req.query.id).populate('likes');
        }

        // Check if a like already exists 
        let existingLike = await Like.findById({
            likeable: req.query.id,
            onModel: req.query.type,
            user: req.user._id
        });

        // If already exists, delete it 

        if (existingLike) {
            likeable.likes.pull(existingLike._id);
            likeable.save();

            existingLike.remove();
            deleted: true;
        }
        // If doesn't exit, add a like 
        else {
            let newLike = await new Like.create({
                user: req.user._id,
                likeable: req.query.id,
                onModel: req.query.type
            });

            likeable.like.push(like._id);
            likeable.save();
        }
        return res.json(200, {
            messsage: 'Request successful!',
            data: {
                deleted: deleted
            }
        })



    } catch (err) {
        console.log(err);
        return res.json(500, {
            message: 'Internal Server Error'
        });
    }
}