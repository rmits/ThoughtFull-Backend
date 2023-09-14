# ThoughtFull Back-End API

  ![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

## Description

This application is the foundation for an awesome social media app that allows a user to have an account, have freidns, post what is on their mind, and have their friends or other users comment on their posts!

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [License](#license)

## Installation

Since only back-end rn, must have Node installed, along with MongoDB since that is the database being used here, and an API tester such as Insomnia since no front-end has been created yet to add to database

## Usage

The app used 2 different Models through MongoDB and Mongoose, one for Users and one for Thoughts. Their is also a third schema component, for Reactions, but this is used through the Thoughts model since their needs to be a Thought in order to post a Reaction. Users has an array of thoughts that references the Thoughts model so that the Thoughts that they post can be kept track of, and they have the ability to add friends, which references the User model in itself and takes an array of IDs. Thoughts take a text, and keep track of the time that they are created at. Thoughts also has an array for Reactions attached to it, using the reactionsSchema. Below is the Google Drive link to a demo video that demonstrates how the moving off data through routes works.

<https://drive.google.com/file/d/1YvA5iwEqM-y9Ikl9NeWpP-yOHNgMJhq7/view>

## Contributers

N/A

## Tests

N/A

## License

This project is licensed under the [MIT License](https://opensource.org/license/MIT).