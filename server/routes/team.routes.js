const express = require('express')
const router = express.Router()

const Team = require('../models/Team.model')

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
router.post('/join', (req, res, next) => {
  Team.push(req.params.user.id)
    .then(theTeam => res.json(theTeam))
    .catch(err => console.log(err))

})

module.exports = router