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
  compareDate: Date,
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
},
{timestamps: true}
)
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

app.get('/api/users/:_id/logs', async (req,res) => {
  let fromDate = new Date(req.query.from).getTime()
  console.log(fromDate)
  let toDate = new Date(req.query.to).getTime()
  console.log(toDate)

  //if from only
  if (req.query.from && !req.query.to && !req.query.limit) {
    try {
      let user = await User.findById(req.params._id)
      let exercises = await Exercise.find({user: user._id})
      .find({compareDate: {$gte: fromDate}})
      .select("-_id")
      .select("-user")
      .select("-__v")
      console.log(exercises.length)
      console.log(user)
      console.log(req.params.from)
      if(!user) {
        console.log("lkdajlkaj")
      }
      else {
        res.json({
          username: user.username,
          count: exercises.length,
          _id: user._id,
          log: exercises
        })
      }
    }
    catch(e) {
      console.log(e)
    }
    console.log("has from")
  }
  //if to only
  else if (req.query.to && !req.query.from && !req.query.limit) {
    try {
      let user = await User.findById(req.params._id)
      let exercises = await Exercise.find({user: user._id})
      .find({compareDate: {$lte: toDate}})
      .select("-_id")
      .select("-user")
      .select("-__v")
      console.log(exercises.length)
      console.log(user)
      console.log(req.params.from)


      if(!user) {
        console.log("lkdajlkaj")
      }
      else {
        res.json({
          username: user.username,
          count: exercises.length,
          _id: user._id,
          log: exercises
        })
      }
    }
    catch(e) {
      console.log(e)
    }
    console.log("has to")
  }
  //if limit only
  else if (req.query.limit && !req.query.to && !req.query.from) {
    try {
      let user = await User.findById(req.params._id)
      let exercises = await Exercise.find({user: user._id})
      .select("-_id")
      .select("-user")
      .select("-__v")
      .limit(req.query.limit)

      console.log(exercises.length)
      console.log(user)
      console.log(req.params.from)


      if(!user) {
        console.log("lkdajlkaj")
      }
      else {
        res.json({
          username: user.username,
          count: exercises.length,
          _id: user._id,
          log: exercises
        })
      }
    }
    catch(e) {
      console.log(e)
    }
    console.log("limit")

  }
  //if from and to
  else if (req.query.from && req.query.to && !req.query.limit)  {
    try {
      let user = await User.findById(req.params._id)
      let exercises = await Exercise.find({user: user._id})
      .find({compareDate: {$gte: fromDate}})
      .find({compareDate: {$lte: toDate}})
      .select("-_id")
      .select("-user")
      .select("-__v")
      console.log(exercises.length)
      console.log(user)
      console.log(req.params.from)

      if(!user) {
        console.log("lkdajlkaj")
      }
      else {
        res.json({
          username: user.username,
          count: exercises.length,
          _id: user._id,
          log: exercises
        })
      }
    }
    catch(e) {
      console.log(e)
    }
    console.log("from and to")

  }
  //if from and limit
  else if (req.query.from && !req.query.to && req.query.limit) {
    try {
      let user = await User.findById(req.params._id)
      let exercises = await Exercise.find({user: user._id})
      .find({compareDate: {$gte: fromDate}})
      .select("-_id")
      .select("-user")
      .select("-__v")
      .limit(req.query.limit)
      console.log(exercises.length)
      console.log(user)
      console.log(req.params.from)

      if(!user) {
        console.log("lkdajlkaj")
      }
      else {
        res.json({
          username: user.username,
          count: exercises.length,
          _id: user._id,
          log: exercises
        })
      }
    }
    catch(e) {
      console.log(e)
    }
    console.log("has from and limit")

  }
  //if to and limit
  else if (!req.query.from && req.query.to && req.query.limit){
    try {
      let user = await User.findById(req.params._id)
      let exercises = await Exercise.find({user: user._id})
      .find({compareDate: {$lte: toDate}})
      .select("-_id")
      .select("-user")
      .select("-__v")
      .limit(req.query.limit)
      console.log(exercises.length)
      console.log(user)
      console.log(req.params.from)

      if(!user) {
        console.log("lkdajlkaj")
      }
      else {
        res.json({
          username: user.username,
          count: exercises.length,
          _id: user._id,
          log: exercises
        })
      }
    }
    catch(e) {
      console.log(e)
    }
    console.log("has to and limit")

  }
  else if (req.query.from && req.query.to && req.query.limit){
    try {
      let user = await User.findById(req.params._id)
      let exercises = await Exercise.find({user: user._id})
      .find({compareDate: {$gte: fromDate}})
      .find({compareDate: {$lte: toDate}})
      .select("-_id")
      .select("-user")
      .select("-__v")
      .limit(req.query.limit)
      console.log(exercises.length)
      console.log(user)
      console.log(req.params.from)

      if(!user) {
        console.log("lkdajlkaj")
      }
      else {
        res.json({
          username: user.username,
          count: exercises.length,
          _id: user._id,
          log: exercises
        })
      }
    }
    catch(e) {
      console.log(e)
    }
    console.log("has all 3")
  }
  else {
    try {
      let user = await User.findById(req.params._id)
      let exercises = await Exercise.find({user: user._id})
      .select("-_id")
      .select("-user")
      .select("-__v")

      if(!user) {
        console.log("lkdajlkaj")
      }
      else {
        res.json({
          username: user.username,
          count: exercises.length,
          _id: user._id,
          log: exercises
        })
      }
    }
    catch(e) {
      console.log(e)
    }
    console.log("lksdjalksjd")
  }
})
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
app.post('/api/users/:_id/exercises', async function(req,res) {
  if (req.body.date) {
    let date = new Date(req.body.date)
    date = date.toDateString()
    let newExercise = new Exercise({
      description: req.body.description,
      duration: req.body.duration,
      date: date,
      user: req.params._id,
      compareDate: new Date(date).getTime()
    })
    newExercise.save()
    try {let user = await User.findById(req.params._id)
      console.log(user._id)
      if (!user) {
        console.log("sldkjfaslkdjf")}
        else {
          res.json({
            _id: req.params._id,
            username: user.username,
            description: newExercise.description,
            duration: newExercise.duration,
            date: new Date (newExercise.date).toDateString()
          })
        }
    }
    catch(e) {
      console.log(e)
    }
  }
  else {
    let newExercise = new Exercise({
      description: req.body.description,
      duration: req.body.duration,
      date: new Date().toDateString(),
        user: req.params._id,
        compareDate: new Date().getTime()

    })
    newExercise.save()
    try {let user = await User.findById(req.params._id)
      console.log(user._id)
    if (!user) {
    console.log("sldkjfaslkdjf")}
    else {
      res.json({
        _id: req.params._id,
        username: user.username,
        description: newExercise.description,
        duration: newExercise.duration,
        date: newExercise.date
      })
    }
    }
    catch(e) {
      console.log(e)
    }
  }

})
const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
