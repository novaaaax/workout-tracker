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
app.post("/api/workouts",(req,res) =>{
    db.Workout.create(req.body, (err, data) => {
        if (err){
            throw err;
        }
        res.send(data);
    });
});

app.get("/api/workouts", (req, res) => {
    db.Workout.find({})
    .then()
});

app.get("/api/workouts/range",(req, res) => {
    db.Workout.find({})
    .then(exercise => {
        res.json(exercise);
    })
});

app.put("/app/workouts/update/:id",(req, res) =>{
    db.Workout.findOneAndUpdate({ _id: mongoose.Types.ObjectId(req.params.id)},
    { $set: {exercises: req.body}}, (err, data) => {
        if(err){
            throw err;
        }
        res.send(data)
    })
});
//Start server
app.listen(PORT, () => {
    console.log(`App running on port localhost:${PORT}`);
  });