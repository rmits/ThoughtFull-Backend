const router = require('express').Router();
const { User, Thoughts, Reactions } = require('../models');

router.get('/', async (req, res) => {
    try {
        const thought = await Thoughts.find()
        res.status(200).json({
            message: "Thoughts Grabbed",
            data: {
                thought: thought,
                reactions: thought.reactionCount
            }
        })
    } catch (err) {
        res.status(500).json(err.message)
    }
});

router.get('/:id', async (req, res) => {
    try {
        const thought = await Thoughts.findById(req.params.id)

        if (!thought) {
            res.status(404).json('Thought Not Found')
        }
        res.status(200).json({
            message: "Thought Grabbed",
            data: {
                thought: thought
            }
        })

    } catch (err) {
        res.status(500).json(err.message)
    }
});

router.post('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const newThought = new Thoughts({
            thoughtText: req.body.thoughtText,
            username: user.username
        })
        await newThought.save();
        user.thoughts.push(newThought._id);
        await user.save();
        res.status(200).json({ 'New Thought Complete!': newThought });
    } catch (err) {
        res.status(500).json(err.message);
    }
});

router.post('/:id/reactions', async (req, res) => {
    try {
        const thought = await Thoughts.findById(req.params.id)
        const { reactionBody, username } = req.body;
        const newReaction = {
            reactionBody,
            username
        }

        thought.reactions.push(newReaction);
        await thought.save();
        res.json({ message: 'New Reaction Complete!', data: thought.reactions });
    } catch (err) {
        res.status(500).json(err.message);
    }
});

router.put('/:id', async (req, res) => {
    try {
        const thought = await Thoughts.findByIdAndUpdate(req.params.id, req.body, { new: true })

        if (!thought) {
            res.status(404).json('Thought with that ID not found', thought)
        } else {
            await thought.save();
            res.status(200).json({
                message: "Thought Updated", data: {
                    thought: thought
                }
            })
        }
    } catch (err) {
        res.status(500).json(err.message)
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const thought = await Thoughts.findByIdAndDelete(req.params.id);

        if (!thought) {
            res.status(404).json('thought with that ID not found', thought)
        } 
            res.status(200).json("Thought Went Bye Bye!")
        
    } catch (err) {
        res.status(500).json(err.message)
    }
});

router.delete('/:thoughtId/reactions', async (req, res) => {
    try {
        const thought = await Thoughts.findById(req.params.thoughtId);
        const { reactionId } = req.body;
        const deleteReaction = {
            reactionId
        }

        if (!thought) {
            res.status(404).json('Thought not found', thought)
        }
        thought.reactions.pull(deleteReaction)
        await thought.save();
        res.status(200).json({message: 'Removed Reaction!'});

    } catch (err) {
        res.status(500).json(err.message)
    }
});



module.exports = router;