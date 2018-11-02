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

// Creates a profile with a First Last Name and a Bio (AboutMe)
router.post('/user', (req, res) => {
    const { FirstName, LastName, AboutMe } = req.body
    
    const newProfile = new profile ({
        FirstName,
        LastName,
        AboutMe
    })
    newProfile.save()
        .then(prof => res.status(201).json(prof))
        .catch(err => {
            res.status(500).json({message: err});
        });
})

router.put('/')

router.delete('/:name', (req, res) => {
    const { FirstName, LastName, AboutMe } = req.params;
    profile.findOne({ AboutMe })
    .then(prof => {
       if(!prof) {
           return res.status(404).json({message: `Profile: ${AboutMe} was not able to be found`});
       } 
       prof.remove()
       .then(() => res.status(204).json({message: `Profile ${AboutMe} successfully deleted`}))
       .catch(err => res.status(500).json({err}));
    })
    .catch(err => res.status(500).json({message: err}));
});


module.exports = router;
