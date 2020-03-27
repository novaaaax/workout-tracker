const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const path = require("path")
const PORT = process.env.PORT || 3000;
const db = require("./models");
const app = express()

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true });

//Routes go here

app.get("/", (req,res) => {
    res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/exercise", (req,res) => {
    res.sendFile(path.join(__dirname, "public/exercise.html"));
});

app.get("/stats",(req,res) =>{
    res.sendFile(path.join(__dirname, "public/stats.html"));
});

//async addExercise function
//add exercise
app.post("/api/workout",(req,res) =>{
    db.Workout.create(body)
    .then(({ _id }) => db.Exercise.findOneAndUpdate({}, { $push: { exercise: _id } }, { new: true }))
    .then(dbUser => {
      res.json(dbUser);
    })
    .catch(err => {
      res.json(err);
    })
});
app.get("/api/workouts/range",(req, res) => {
    db.Workout.where({})
});
app.put("/app/workouts/update/:id",(req, res) =>{
});
//Start server
app.listen(PORT, () => {
    console.log(`App running on port localhost:${PORT}`);
  });