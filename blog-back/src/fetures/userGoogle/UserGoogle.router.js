const express = require('express')

const passport=require("./configs/google.oauth.js")

const app = express.Router()

const Client_Url="http://localhost:3000/"

app.use(express.urlencoded({extended: true}))
app.use(express.json())

let blacklist=[]
app.get('/logout', function(req, res) {
        res.redirect('/');
    
});app.get('/google',
  passport.authenticate('google', { scope: ['profile',"email"] }));

app.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login',session:false }),
  function(req, res) {
    console.log(req.user)
    res.redirect(Client_Url);
  });

  

module.exports=app;