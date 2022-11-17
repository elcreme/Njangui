const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const GroupSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    max_members: Number,
    public: {
        type: Boolean,
        default: false
    },
    requests: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'user'
    },
    members: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
        },
        host: {
            type: Boolean,
            default: false
        }
    }],
    stickied_posts: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
        },
        name: String,
        post: String,
        time_stamp: Date
    }],
    date: {
        type: Date,
        default: Date.now
    }
});


var Group = mongoose.model('groups', GroupSchema);

module.exports = Group;