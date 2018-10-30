const express = require('express');
const User = require('../../models/User');
const router = express.Router();

// router.get('/', (req, res) => {
   // res.json({message: 'Welcome to User route'});
// })

router.get('/', (req, res) => {
    User.find()
    .then(users => {
        res.json(users)
    })
    .catch(err => console.log(err))
})

// url /api/users/?name=cliff
// url /api/users/cliff

// grabs any name thats in the collection of the document if not it will leave it blank, if name isn't found
router.get('/:name', (req, res) => {
    const { name, password, avatar } = req.params;
    User.findOne({ name })
     .then(user => {
         if(!user) {
             return res.status(404).json({message: `User: ${name} not found`});
         }
         res.json(user);
     })
     .catch(err => res.status(500).json({message: err}));
})

module.exports = router;