const express     = require("express");
const bodyParser  = require("body-parser");
const cors        = require("cors");
const app         = express();
const knex        = require('knex');
const bcrypt      = require("bcrypt-nodejs");
const register    = require("./controllers/register");
const signIn      = require("./controllers/signIn");
const profileGet  = require("./controllers/profileGet");
const imagePost   = require("./controllers/imagePost");

const PASSWORD = process.env.PASSWORD;

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : PASSWORD,
    database : 'face-recognition'
  }
});

app.use(bodyParser.json())
app.use(cors())


app.get("/", (req, res) => {
  db.select("*").from("users")
    .then(users => {
      console.log(users)
    })
  .catch(err => res.status(400).json("Error Obtaining User Info"))
})

app.post("/signin", (req, res) => { signIn.handleSignIn(req, res, db, bcrypt) });

app.post("/register", (req, res) => { register.handleRegister(req, res, db, bcrypt) });

app.get("/profile/:id", (req, res) => { profileGet.handleProfileGet(req, res, db) });

app.put("/image", (req, res) => { imagePost.handleImagePost(req, res, db) });
app.post("/imageurl", (req, res) => { imagePost.handleApiCall(req, res) });

app.listen(process.env.PORT || 3001, () => {
  console.log("Face Detection Initialising...")
});
