const Like = require('../models/like');
const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.toggleLike = async function (req, res) {
    try {
        // Likes/toggle/id=xyz123&type

        let likeable;
        let deleted = false;

        // if (req.query.type ='post') {
        // yha  compare hie galat aya h,schema Post hoga apne ne value assign kar raka tha 
        if (req.query.type == 'Post') {
            likeable = await Post.findById(req.query.id).populate('likes');
        } else {
            likeable = await Comment.findById(req.query.id).populate('likes');
        }

        // Check if a like already exists 
        // find by Id nhi karna 
        let existingLike = await Like.findOne({
            likeable: req.query.id,
            onModel: req.query.type,
            user: req.user._id
        });

        // If already exists, delete it 

        if (existingLike) {
            likeable.likes.pull(existingLike._id);
            likeable.save();

            existingLike.remove();
            deleted = true;
        }
        // If doesn't exit, add a like 
        else {
            let newLike = await Like.create({
                user: req.user._id,
                likeable: req.query.id,
                onModel: req.query.type

            });
            // console.log(deleted);
            // Like ki error thi
            likeable.likes.push(newLike._id);
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