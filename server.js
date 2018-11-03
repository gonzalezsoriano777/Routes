const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const db = require('./config/keys').mongoURI;

mongoose
    .connect(db, { useNewUrlParser: true, useCreateIndex: true, })
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err))
    
const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())

const users = require('./routes/api/users');
const profiles = require('./routes/api/routers');

app.use('/api/users', users);
app.use('/api/routers', profiles);

app.get('/', (req, res) => res.send('Hello'))

const port = process.env.PORT || 5000

app.listen(port, () =>console.log('Application listening on port', port))