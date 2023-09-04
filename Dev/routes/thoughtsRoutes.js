const router = require('express').Router();
const { User, Thoughts, Reactions } = require('../models');

router.get('/', (req, res) => {
    Thoughts
    .find()
    .then((data) => res.json(data))
    .catch((err) => res.json(err))
});

routher.get('/:id', (req, res) => {
    Thoughts
    .findById(req.params.id)
    .then((data => res.json(data)))
    .catch((err) => res.json(err))
})

router.post('/', async (req, res) => {
    try {
        const newThought = new Thoughts({
            thoughtText: req.body.thought,
            username: req.params.username
        })

        await newThought.save();
        res.json('New Thought Complete!', newThought);
    } catch (err) {
        res.json(err);
    }
})