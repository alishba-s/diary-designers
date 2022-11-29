// This is the start of your backend server. We will write server side code here

//this is a node package that will help us create a server
const express = require("express");
//this is the main app. Apps can get complicated. For now, think of it as a place to store your routes
const app = express();
//this is the port we are going to listen on. Backend programs listen on ports to get information from other computers
const PORT = 8000;

/**
 * Remember how before I talked about listening on a port? We do that here. Our app "pauses" and waits for requests to come in.
 *
 * These requests can be from browsers, other computers in the cloud, or even your fridge!
 */
app.listen(PORT, function () {
  console.log(`Listening on port ${PORT}`);
});

//Confidential Data are here!
const USER_PASSWORD = "ES1012";
const USER_SAVED_NOTE = {
  note1: "This is note 1.",
  note2: "This is note 2.",
  note3: "this is note 3.",
};

/**
 * Post functions to process the requests from frontend.js.
 */
app.post("/post", function (req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  console.log("Received Password: ");
  let data = JSON.parse(req.query["data"]);
  console.log(data);
  if (data["password"] == USER_PASSWORD) {
    res.sendFile(__dirname + "/diary.html");
  } else {
    res.send(
      JSON.stringify({
        passwordBoolean: false,
      }),
    );
  }
});

/**
 * This is a route. Routes help the computer understand what the user is trying to access.
 *
 * For example, if the user makes a GET request to "/" (which we learn later is http://localhost:8000/),
 * the computer will run the function beside it.
 */
app.get("/", function (req, res) {
  //`res` is an object with methods. The `json` method allows us to send information back to users in the form of json
  res.setHeader("Access-Control-Allow-Origin", "*"); //don't worry about this, just a security thing to allow us to test without problems. If you are curious; CORS is the term to look up.
  res.json({
    ping: "pong",
  });
});
