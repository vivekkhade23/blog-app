const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport=require("passport")
require("dotenv").config()
const userModel=require("../../User/User.model")
const { v4: uuidv4 } = require('uuid');

const GOOGLE_CLIENT_ID ="309173535315-7c7kkg6evrn5qpmpmfm36lgu5lm4httn.apps.googleusercontent.com"
const GOOGLE_CLIENT_SECRET="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"

passport.use(new GoogleStrategy({
    clientID:GOOGLE_CLIENT_ID,
    clientSecret:GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:8080/auth/google/callback"
  },
 async function(accessToken, refreshToken, profile, cb) {

  // console.log(accessToken,refreshToken);
  let email=profile._json.email
    const user=new userModel({
      email,
      password:uuidv4()
    })
    await user.save();
    const {_id,password}=user;
    const payload={
      email,
      _id,
      password,
      url:profile._json.picture,
    }

    console.log(payload)
  return cb(null,payload)

  // console.log(profile);
  }
));


module.exports=passport;