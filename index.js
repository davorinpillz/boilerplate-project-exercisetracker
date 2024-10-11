const express = require('express')
const app = express()
const cors = require('cors')
const { MongoClient } = require('mongodb');
const mongoose = require('mongoose');
require('dotenv').config()
mongoose.connect('mongodb+srv://ddp1329:clifton84@cluster0.x0i7l.mongodb.net/new?retryWrites=true&w=majority&appName=Cluster0')
app.use(express.urlencoded({ extended: false }));
app.use(express.json())
app.use(cors())
app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});
const Schema = mongoose.Schema
const userSchema = new Schema({
  username: String,
  exercises: [{
    type: Schema.Types.ObjectId,
    ref: "Exercise"
  }]
})
const User = mongoose.model("User", userSchema)
const exerciseSchema = new Schema({
  username: String,
  description: String,
  duration: Number,
  date: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
})
const Exercise = mongoose.model("Exercise", exerciseSchema)
const logSchema = new Schema({
  username: String,
  count: Number,
  log: [{
    description: String,
    duration: Number,
    date: String
  }]
})
const Log = mongoose.model("Log", logSchema)
app.post('/api/users', function(req,res) {
  let newUser = new User({username: req.body.username})
  newUser.save()
  res.json(newUser)
})
app.get('/api/users',  function(req,res) {
  User.find().select("-__v").select("-exercise").then((r) => {
    res.send(r)
  })
})
app.post('/api/users/:_id/exercises', function(req,res) {
  if (req.body.date) {
    let date = new Date(req.body.date)
    date = date.toUTCString()
    let newExercise = new Exercise({
      description: req.body.description,
      duration: req.body.duration,
      date: date,
      user: req.params._id
    })
    newExercise.save()
    function updateUser() {
      User.findOneAndUpdate({_id: req.params._id}, {$push: {exercises: newExercise._id}}).then()
    }     function populateUser() {
       User.find({_id: req.params._id}).populate("exercises").exec().then((result) => {
        res.json(result)
      })
    }
    updateUser()
    populateUser()
  }
  else {
    let newExercise = new Exercise({
      description: req.body.description,
      duration: req.body.duration,
      date: new Date().toUTCString(),
          user: req.params._id
    })
    newExercise.save()
    function updateUser() {
       User.findOneAndUpdate({_id: req.params._id}, {$push: {exercises: newExercise._id}}).then()
    }
    function populateUser() {
        User.find({_id: req.params._id}).populate("exercises").then((result) => {
          res.json(result)
        })
    }
    updateUser()
    populateUser()
  }
})
const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})



