const express = require('express')
const router = express.Router()
const Team = require('../models/Team.model')


router.get('/getAllTeams', (req, res, next) => {
  Team.find()
    .populate("members")
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

router.get('/getMyTeam', (req, res, next) => {
  Team.find({ members: { $in: req.user._id } })
    .populate('members')
    .then(myTeam => res.json(myTeam))
    .catch(err => console.log(err))
})

router.get('/getMatch', (req, res, next) => {
  Team.find({ members: { $in: req.user._id } })
    .populate('members')
    .then(myTeam => res.json(myTeam))
    .catch(err => console.log(err))
})



module.exports = router
