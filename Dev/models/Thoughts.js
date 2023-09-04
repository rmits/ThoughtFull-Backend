const mongoose = require('mongoose');
const reactionsSchema = require('../models/Reactions');

const thoughtsSchema = new mongoose.Schema({
    thoughtText: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 280,
    }, 
    createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => {
            return new Date(timestamp.toLocaleString);
        },
    },
    username: {
        type: String,
        required: true,
    },
    reactions: [reactionsSchema],
});

thoughtsSchema.virtual('reactionCount').get(() => {
    return this.reactions.length;
});

const Thoughts = mongoose.model('thoughts', thoughtsSchema);

module.exports = Thoughts