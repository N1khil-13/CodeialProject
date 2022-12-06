const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    // Defines the object id of the liked object 
    likeable: {
        type: mongoose.Schema.ObjectId,
        required: true,
        refPath: 'onModel'
    },
    // field used for defining the type of the object since it's a dynamic reference 
    onModel: {
        type: String,
        required: true,
        enum: ['Post', 'Comment']
    }

}, {
    timestamps: true
});


const Like = mongoose.model('Like', likeSchema);

module.exports = Like;