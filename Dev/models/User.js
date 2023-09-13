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
        validator: function (value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(value);
          },
          message: 'Invalid email address',
    },
    thoughts: [
        { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'thoughts',
        },
    ],
    friends: [
        { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'user'
        },
    ],
});

userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
  });

userSchema.virtual('thoughtsCount').get(function () {
    return this.thoughts.length;
})

const User = mongoose.model('user', userSchema);

 module.exports = User;