const express = require('express');
const bcrypt = require('bcrypt-nodejs')
const app = express();
const cors = require('cors');
const knex = require('knex')({
  client:'pg',
  connection:{
    host: process.env.DATABASE_URL,
    ssl: true
  }
});
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());


const register = require('./controllers/register');
const signIn = require('./controllers/signIn');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

app.get('/', (req,res) =>{
  res.send('it is working')
});

app.post('/signin', (req, res) => {signIn.handleSignIn(req,res,knex,bcrypt)})
app.post('/register', (req, res) => {register.handleRegister(req, res, knex, bcrypt)})
app.get('/profile/:id', (req, res) => {profile.getProfile(req,res,knex)})
app.put('/image', (req, res) => {image.imageSubmission(req,res, knex)})
app.post('/imageUrl', (req, res) => {image.handleApiCall(req,res)})


app.listen(PORT, ()=>{
  console.log(`listening on ${PORT}`)
})
