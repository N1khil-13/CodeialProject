const passport = require('passport');
// const user = require('../models/user');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

passport.use(new LocalStrategy({
    usernameField: 'email'
},
    function (email, password, done) {
        User.findOne({ email: email }, function (err, user) {
            if (err) {
                console.log('Error in finding user --> Passport');
                return done(err);
            }
            // console.log(user, email, password);
            if (!user || user.password != password) {
                console.log('Invalid username or password');
                return done(null, false);
            }

            return done(null, user);
        });
    }
));

// Serializing the user to decide which key is to be kept in the cookies

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

// Deserializing the user from the key in the cookies

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        if (err) {
            console.log('Error in finding user --> Passport');
            return done(err);
        }

        return done(null, user);
    });
});

// Check if user is authenticated 
passport.checkAuthentication = function (req, res, next) {
    // If user is signed in, pass on the request to next function(controller action)
    if (req.isAuthenticated()) {
        return next();
    }

    // If user is not signed in 
    return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser = function (req, res, next) {
    if (req.isAuthenticated()) {
        // sending req.user details from session cookie to locals for the views 

        res.locals.user = req.user;
    }
    next();
}

module.exports = passport;