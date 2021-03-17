//const dotenv = require("dotenv");
const express = require("express");
const app = express();
const mongoose = require("mongoose");

//Import routes
const subscribersRouter = require("./routes/subscribers");
const authRouter = require("./routes/authentication");
const privateRouter = require("./routes/route-private");
const sendMail = require("./routes/send-mail");


//dotenv.config();

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true , useUnifiedTopology: true}, () => 
    console.log("Connected to Database")
);

const db = mongoose.connection;

// Check DB Connections
db.on("error", (error) => console.error(error));

// Call middleware to parse only json
app.use(express.json());

// Route Middleware
app.use("/subscribers", subscribersRouter);
app.use("/api/user", authRouter);
app.use("/api/post", privateRouter);
app.use("/api/mail", sendMail);


app.get('/', function (req, res) 
{ 
   res.send('Hello World');
});



 
 

app.listen(process.env.PORT, () =>
  console.log("Server Started on port : " + process.env.PORT)
);
