const router = require("express").Router();
const path = require('path');
const Exercise = require("../models/Exercise");

router.get("/api/workouts", (req, res)=> {
    Exercise.aggregate([
        { $addFields: {totalDuration: {$sum: "$exercises.duration"}}}
    ])  .sort({_id: -1})
        .limit(7)
        .then (workouts => {
            res.json(workouts);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

router.post("/api/workouts", (req, res) => {
  Exercise.create(req.body)
  .then(workouts => {
      res.json(workouts);
  })
  .catch(err => {
      res.status(400).json(err);
  });
});

router.get("/api/workouts/range", (req, res)=> {
  Exercise.aggregate([
      { $addFields: {totalDuration: {$sum: "$exercises.duration"}}}
  ])
      .then (workouts => {
          res.json(workouts);
      })
      .catch(err => {
          res.status(400).json(err);
      });
});

router.put("/api/workouts/:id", (req, res) => {
  Exercise.findByIdAndUpdate(
    { _id: req.params.id }, { $push: {exercises: req.body} }
  ).then((workout) => {
    res.json(workout);
  }).catch(err => {
    res.status(400).json(err);
  });
});

router.get("/exercise", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/exercise.html"));
});

router.get("/stats", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/stats.html"));
});


module.exports = router;