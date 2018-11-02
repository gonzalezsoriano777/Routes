const express = require('express');
const profile = require('./routing-prac/profile')
const router = express.Router();

router.get('/', (req, res) => {
     profile.find()
    .then(router => {
        res.json(router)
    })
    .catch(err => console.log(err))
})

// Finds one Profile
router.get('/first/:name', (req, res) => {
    const { FirstName } = req.params
    profile.findOne({ FirstName })
    .then(prof => {
        if(!prof) {
            return res.status(404).json({message: `Profile: ${FirstName} was not found!`});
            }
        res.json(prof);
    })
    .catch(err => res.status(500).json({message: err}));
});

// Finds all Profiles for First and Last Name
router.get('/:name', (req, res) => {
    const { FirstName, LastName } = req.params
    profile.findAll({ FirstName, LastName })
    .then(prof => {
        if(!prof) {
            return res.status(404).json({message: `Profiles: ${FirstName, LastName} of all profiles could not be found!`});
            }
            res.json(prof);
    })
    .catch(err => res.status(500).json({message: err}));
})


