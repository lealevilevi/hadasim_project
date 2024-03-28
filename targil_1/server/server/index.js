import express from "express";
// import courses from './Routes/courses.js';
import patient from './Routes/patient.js';
import vaccination from "./Routes/vaccination.js";
import user from './Routes/user.js'
// import leaders from './Routes/leaders.js';
// import domains from './Routes/domains.js';
// import classes from './Routes/classes.js';
import cors from "cors";
import bodyParser from "body-parser";
import jwt  from "jsonwebtoken";
// import http from 'http';
// import bcrypt from "bcrypt";

import patientModel from './models/patientModel.js';
import vaccinationModel from "./models/vaccinationModel.js";
import userModel from "./models/userModel.js";
// import leaderModel from './models/leaderModel.js';

// import mongoConnect from './db/mongoConnect.js';
import("./db/mongoConnect.js")
const app = express(); //מופע מסוג הקספרסס
const port = 3001;

var corsOptions = {
  origin: "*"
};
app.use(express.json());

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: true
}));
// app.use("/uploads",express.static("uploads"))

app.post("/login", async (req, res) => {
  console.log("I am in login");
    // Our login logic starts here
    try {
      // Get user input
      const { id,password} = req.body;
      // Validate user input
      if (!id || !password) {
      console.log("All input is required");
        res.status(400).send("All input is required");
        return;
      }
      // Validate if user exist in our databases
      const userr = await userModel.findOne({ id,password });
      if(userr==null){
        res.status(404).send('not found, you have to sign in');
        return;}
      let user=userr;
      console.log(user);
        // Create token
        const token = jwt.sign({
            id: user.id,
            password:user.password,
          },
          "dsdddder", {
            expiresIn: "15h",
          }
        );
        // save user token
        user.token = token;
        console.log(token);
        let user1={"token":token,"name":user.name};
        res.status(200).send(user1).end();     
    } 
    catch (err) {
      console.log(err);
    }
    // Our register logic ends here
});
  



app.get('/', (req, res) => {
  res.send('Hello World!')
})


// //routing
app.use("/user",user);
app.use("/patient", patient);
app.use("/vaccinations",vaccination);


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })