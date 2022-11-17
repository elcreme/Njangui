require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const {Configuration, PlaidApi, Products, PlaidEnvironments} = require("plaid");
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const users = require("./routes/api/users");
const plaid = require("./routes/api/plaid");
const groups = require("./routes/api/group");
const auth =  require('./routes/api/auth');
// app.post('/create_link_token', async (req, res, next) => {
//   let payload = {};
//   //Payload if running iOS
//   var user = req.body;
//   if (req.body.address === 'localhost') {
//     payload = {
//       user: {client_user_id: user.id},
//       client_name: 'Plaid Tiny Quickstart - React Native',
//       language: 'en',
//       products: ['auth'],
//       country_codes: ['US'],
//       redirect_uri: process.env.PLAID_SANDBOX_REDIRECT_URI,
//     };
//   } else {
//     //Payload if running Android
//     payload = {
//       user: {client_user_id: req.sessionID},
//       client_name: 'Plaid Tiny Quickstart - React Native',
//       language: 'en',
//       products: ['auth'],
//       country_codes: ['US'],
//       android_package_name: process.env.PLAID_ANDROID_PACKAGE_NAME,
//     };
//   }
//   const tokenResponse = await client.linkTokenCreate(payload);
//   res.json(tokenResponse.data);
// });


// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

// DB Config
const db = require("./config/keys").mongoURI;


// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

// Routes
app.use("/api/users", users);
app.use("/api/njangui", groups);
app.use("/api/plaid", plaid);
app.use('/api/auth', auth);


// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

const port = process.env.PORT || 5000;

http.listen(port, () => console.log(`Server up and running on port ${port} !`));