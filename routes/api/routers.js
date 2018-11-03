const express = require('express');
const profile = require('../../models/Profile');
const router = express.Router();

var bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}))


router.get('/', (req, res) => {
     profile.find()
        .then(router => {
        res.json(router)
    })
    .catch(err => console.log(err))
})

// Finds one Profile
router.get('/first/:name', (req, res) => {
    const FirstName = req.params.name
    profile.findOne({ FirstName })
    .then(router => {
        if(!router) {
            return res.status(404).json({message: `Profile: ${FirstName} was not found!`});
            }
        res.json(router);
    })
    .catch(err => res.status(500).json({message: err}));
});

// Finds all Profiles for First and Last Name
router.get('/:name', (req, res) => {
    const { FirstName, LastName } = req.params
    profile.find({ FirstName, LastName })
    .then(router => {
        if(!router) {
            return res.status(404).json({message: `Profiles: ${FirstName, LastName} of all profiles could not be found!`});
            }
            res.json(router);
    })
    .catch(err => res.status(500).json({message: err}));
})

// Creates a profile with a First Last Name and a Bio (AboutMe)
router.post('/user', (req, res) => {
    const { FirstName, LastName, AboutMe, Age } = req.body
    
    const newProfile = new profile ({
        FirstName,
        LastName,
        AboutMe,
        Age
    })
    newProfile.save() //asynchronize methods
        .then(router => res.status(201).json(router))
        .catch(err => {
            res.status(500).json({message: err});
        });
})

// Updates profile
router.put('/:email', (req, res) => {
    profile.findOneAndUpdate({FirstName: req.params.name},
    {$set: {Email: req.body.Email}}, {new: true}) // $set , this is used in MONGO
    .then(router =>{
        if(!router) {
            res.status(404).json(`There is no profile for ${req.params.name} to actually update`)
        }else {
            res.json(router);
        }
       
    })
    .catch(err => res.status(500).json({message: err}))
})

// Deletes profile AboutMe
router.delete('/:name', (req, res) => {
    const { FirstName, LastName, AboutMe } = req.params;
    profile.findOne({ AboutMe })
    .then(router => {
       if(!router) {
           return res.status(404).json({message: `Profile: ${AboutMe} was not able to be found`});
       } 
       router.remove()
       .then(() => res.status(204).json({message: `Profile ${AboutMe} successfully deleted`})) // 204 meanns no data added to the json
       .catch(err => res.status(500).json({err}));
    })
    .catch(err => res.status(500).json({message: err}));
});


module.exports = router;
