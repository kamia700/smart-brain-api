const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profileget = require('./controllers/profileget');
const image = require('./controllers/image');

const db= knex({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    user: 'postgres', 
    password: 'Frtk73pointQ',
    database: 'smart-brain' 
  }
});

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => { res.send(database.users) });
// app.post('/signin', (req, res) => { signin.handleSignIn(req, res, db, bcrypt) }); or
app.post('/signin', signin.handleSignIn(db, bcrypt));
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) });
app.get('/profile/:id', (req, res) => { profileget.handleProfileGet(req, res, db) });
app.put('/image', (req, res) => { image.handleImage(req, res, db) });
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res) });

app.listen(process.env.PORT || 3000, ()=> {
  console.log(`app is running on port 3000 ${ process.env.PORT }`);
});