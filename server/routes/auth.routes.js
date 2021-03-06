const express = require('express');
const authRoutes = express.Router();
const passport = require('passport');
const bcrypt = require('bcryptjs');
const User = require('../models/User.model')



authRoutes.post('/signup', (req, res, next) => {
    console.log("------ PAYLOAD EN DESTINO -----", req.body)


    const username = req.body.username;
    const password = req.body.password;
    const history = req.body.history;
    const position = req.body.position;
    const kills = req.body.kills;
    const deaths = req.body.deaths;
    const assists = req.body.assists;
    const imageUrl = req.body.imageUrl;
    const email = req.body.email;



    if (!username || !password) {
        res.status(400).json({ message: 'Provide username and password' });
        return;
    }
    if (password.length < 2) {
        res.status(400).json({ message: 'Please make your password at least 8 characters long for security purposes.' });
        return;
    }
    User.findOne({ username }, (err, foundUser) => {
        if (err) {
            res.status(500).json({ message: "Username check went bad." });
            return;
        }
        if (foundUser) {
            res.status(400).json({ message: 'Username taken. Choose another one.' });
            return;
        }
        const salt = bcrypt.genSaltSync(10);
        const hashPass = bcrypt.hashSync(password, salt);
        console.log(req.body, req.file)
        const aNewUser = new User({
            username: username,
            password: hashPass,
            imageUrl,
            history,
            email,
            data: {
                position,
                kills,
                deaths,
                assists,
            }
        });
        aNewUser.save(err => {
            if (err) {
                console.log(err)
                res.status(400).json({ message: 'Saving user to database went wrong.' });
                return;
            }
            console.log(aNewUser)
            // Automatically log in user after sign up
            // .login() here is actually predefined passport method
            req.login(aNewUser, (err) => {
                if (err) {
                    res.status(500).json({ message: 'Login after signup went bad.' });
                    return;
                }
                // Send the user's information to the frontend
                // We can use also: res.status(200).json(req.user);
                console.log(aNewUser, "nuevo user creado")
                res.status(200).json(aNewUser);
            });
        });
    });
});
authRoutes.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, theUser, failureDetails) => {
        if (err) {
            res.status(500).json({ message: 'Something went wrong authenticating user' });
            return;
        }
        if (!theUser) {
            // "failureDetails" contains the error messages
            // from our logic in "LocalStrategy" { message: '...' }.
            res.status(401).json(failureDetails);
            return;
        }
        // save user in session
        req.login(theUser, (err) => {
            if (err) {
                res.status(500).json({ message: 'Session save went bad.' });
                return;
            }
            // We are now logged in (that's why we can also send req.user)
            res.status(200).json(theUser);
        });
    })(req, res, next);
});
authRoutes.post('/logout', (req, res, next) => {
    // req.logout() is defined by passport
    req.logout();
    res.status(200).json({ message: 'Log out success!' });
});
authRoutes.get('/loggedin', (req, res, next) => {
    // req.isAuthenticated() is defined by passport
    if (req.isAuthenticated()) {
        res.status(200).json(req.user);
        return;
    }
    res.status(403).json({ message: 'Unauthorized' });
});
module.exports = authRoutes;