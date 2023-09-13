const router = require('express').Router();
const { User } = require('../models');

router.post('/', async (req, res) => {
    try {
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        })
        await newUser.save();
        res.status(200).json(newUser);
    } catch (err) {
        res.status(500).json(err.message)
    }
})

router.post('/:id/friends/:friendId', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const friend = await User.findById(req.params.friendId);
        console.log(user, friend);
        if (!user || !friend) {
            res.status(404).json('User or friend not found')
        }
        //make sure that not only the user adding gets the friend id,
        //but the friend being added gets the uder id into their friend array
        user.friends.push(friend._id);
        friend.friends.push(user._id);
        await user.save();
        await friend.save();
        res.status(200).json('New Friend Added!', user, user.friendCount);
    } catch (err) {
        res.status(500).json(err);
    }
})

router.get('/', async (req, res) => {
    try {
        const user = await User.find()
        res.status(200).json(user, user.friendCount, user.thoughtCount)
    } catch (err) {
        res.status(500).json(err.message)
    }
})

router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)

        if (!user) {
            res.status(404).json('User with that ID not found', user)
        }
        res.status(200).json(user, user.friendCount, user.thoughtCount)

    } catch (err) {
        res.status(500).json(err.message)
    }
})

router.put('/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true })

        if (!user) {
            res.status(404).json('User with that ID not found', user)
        }
        await user.save();
        res.status(200).json(user, user.friendCount, user.thoughtCount)

    } catch (err) {
        res.status(500).json(err.message)
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);

        if (!user) {
            res.status(404).json('User with that ID not found', user)
        }
        res.status(200).json('User Successfully Removed!')

    } catch (err) {
        res.status(500).json(err.message)
    }
})

router.delete('/:id/friends/:friendId', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const friend = await User.findById(req.params.friendId);

        if (!user || !friend) {
            res.status(404).json('User or friend with that ID not found', user)
        }

        user.friends.pull(friend._id);
        friend.friends.pull(user._id);
        await user.save();
        await friend.save();
        res.status(200).json('Removed Friend Successfully', user, user.friendCount)

    } catch (err) {
        res.status(500).json(err.message)
    }
})

module.exports = router;