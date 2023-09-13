const router = require('express').Router();
const { User, Thoughts, Reactions } = require('../models');

router.get('/', async (req, res) => {
    try {
        const thought = await Thoughts.find()
        res.json(thought, thought.reactionCount);
    } catch (err) {
        res.status(500).json(err)
    }
});

router.get('/:id', async (req, res) => {
    try {
        const thought = await Thoughts.findById(req.params.id)

        if (!thought) {
            res.status(404).json('Thought Not Found')
        } else {
            res.json(thought, thought.reactionCount)
        }
    } catch (err) {
        res.status(500).json(err)
    }
});

router.post('/:id', async (req, res) => {
    try {
        const newThought = new Thoughts({
            thoughtText: req.body.thought,
            username: req.body.username
        })
        await newThought.save();
        res.json('New Thought Complete!', newThought);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/:id/reactions', async (req, res) => {
    try {
        const thought = await Thoughts.findById(req.params.id)
        const newReaction = thought.create({
            reactions: {
                reactionBody: req.body.reactionBody,
                username: req.body.username
            },
        })
        await newReaction.save();
        res.json('New Reaction Complete!', newReaction);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.put('/:id', async (req, res) => {
    try {
        const thought = await Thoughts.findByIdAndUpdate(req.params.id)

        if (!thought) {
            res.status(404).json('Thought with that ID not found', thought)
        } else {
            await thought.save();
            res.status(200).json(thought, thought.reactionCount)
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
        } else {
            await thought.save();
            res.status(200).json(thought, thought.reactionCount)
        }
    } catch (err) {
        res.status(500).json(err.message)
    }
});

router.delete('/:id/reactions', async (req, res) => {
    try {
        const thought = await Thoughts.findById(req.params.id)

        if (!thought) {
            res.status(404).json('Thought not found', thought)
        }
            thought.reactions.pull(req.body.reactionId);
            const updatedThought = await thought.save();
            res.status(200).json('Removed Reaction!', updatedThought, updatedThought.reactionCount);
        
    } catch (err) {
        res.status(500).json(err.message)
    }
});



module.exports = router;