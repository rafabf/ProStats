const express = require('express')
const router = express.Router()

const Team = require('../models/Team.model')
const User = require('../models/User.model')

router.get('/getAllTeams', (req, res, next) => {
  Team.find()
    .then(allTeams => res.json(allTeams))
    .catch(err => console.log(err))
})

router.get('/getOneteam/:id', (req, res, next) => {
  Team.findById(req.params.id)
    .then(theTeam => res.json(theTeam))
    .catch(err => console.log(err))
})

router.post('/new', (req, res, ) => {
  Team.create(req.body)
    .then(theTeam => res.json(theTeam))
    .catch(err => console.log(err))
})



router.post('/join/:id', (req, res) => {

  console.log(req.user._id, "id en back", "y el params del equipo", req.params.id)
  Team.findByIdAndUpdate(req.params.id, { $push: { members: req.user._id }, new: true })
    .then(theTeam => res.json(theTeam))
    .catch(err => console.log(err))

})

router.get('/getMyTeam/:id', (req, res, next) => {
  Team.find(req.params.id, { $in: { members: req.user._id }, new: true })

    .then(myTeam => res.json(myTeam))
    .catch(err => console.log(err))
})


module.exports = router
