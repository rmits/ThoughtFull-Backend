const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: () => Promise.resolve(false),
            message: 'Email Validation Failed'
        }
    },
    thoughts: [
        { 
            type: Schema.Types.ObjectId, 
            ref: 'thoughts',
        },
    ],
    friends: [
        { 
            type: Schema.Types.ObjectId, 
            ref: 'user'
        },
    ],
});

userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
  });

const User = model('user', userSchema);

 module.exports = User;