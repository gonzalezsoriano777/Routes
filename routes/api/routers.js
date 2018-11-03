const express = require('express');
const Profile = require('../../models/Profile');
const router = express.Router();

var bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}))

// Finds all the profiles created
router.get('/', (req, res) => {
     Profile.find()
        .then(router => {
        res.json(router)
    })
    .catch(err => console.log(err))
})

// Finds one Profile
router.get('/first/:name', (req, res) => { // Success
    const FirstName = req.params.name
    Profile.findOne({ FirstName })
    .then(router => {
        if(!router) {
            return res.status(404).json({message: `Profile: ${FirstName} was not found!`});
            }
        res.json(router);
    })
    .catch(err => res.status(500).json({message: err}));
});


// Creates a profile with a First Last Name and a Bio (AboutMe)
router.post('/user', (req, res) => { // Success
    const { FirstName, LastName, AboutMe, Age } = req.body
    
    const newProfile = new Profile ({
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
router.put('/:FirstName', (req, res) => { // 
    const FirstName = req.params.name;
    const { LastName, AboutMe, Age} = req.body
    
    Profile.findOne({ FirstName })
    .then(router => {
        if(!router) {
            res.status(404).json(`Profile: ${FirstName} was not found, cannot update..`)
        } else {
            Profile.findOneAndUpdate(
                { FirstName },
                {$set: { LastName, AboutMe, Age}},
                {new : true},
                ).then(updatedProfile => res.json(updatedProfile))
        }
        
    
    })

})

// Deletes profile AboutMe
router.delete('/del/:LastName', (req, res) => { // Success
    const { FirstName, LastName, AboutMe, Age } = req.params;
    Profile.findOne({ LastName })
    .then(router => {
       if(!router) {
           return res.status(404).json({message: `Profile: ${LastName} was not able to be found`});
       } 
       router.remove()
       .then(() => res.status(204).json({message: `Profile ${LastName} successfully deleted`})) // 204 meanns no data added to the json
       .catch(err => res.status(500).json({err}));
    })
    .catch(err => res.status(500).json({message: err}));
});


module.exports = router;
