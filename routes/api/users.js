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

router.post('/user', (req, res) => {
    const { name, password, avatar } = req.body;
    
    const newUser = new User({
        name,
        password, 
        avatar
    })
    
    newUser.save()
     .then(user => res.status(201).json(user)) // 201 status code means you have added a user or anything in general
      .catch(err => {
          res.status(500).json({ message: err }); // 500 status code means there is an error of the user or something being added from the code
    });
});


router.delete('/:name', (req, res) => {
    // Todo: protected route ensure the user is the one deleting
    const { name, password, avatar } = req.params;
    User.findOne({ name })
     .then(user => {
         if(!user) {
             return res.status(404).json({message: `User: ${name} not found`}); // 404 status code meaning, that the user is non existent
         }
         user.remove()
          .then(() => res.status(204).json({message: `User ${name} successfully deleted`})) // 204 status code meaning,  
          .catch(err => res.status(500).json({err}));
     })
     .catch(err => res.status(500).json({message: err}));
});

router.put('/:name', (req, res) => {
    
  //  findOne()
    //  .then(user) => {
     //     findOneAndUpdate()
      
});

module.exports = router;