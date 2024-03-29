const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtacrtJWT = require('passport-jwt').ExtractJwt;
const env = require('./environment');

const User = require('../models/user');

let opts = {
    jwtFromRequest: ExtacrtJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: env.jwt_secret
}

passport.use(new JWTStrategy(opts, function (jwtPayload, done) {

    User.findById(jwtPayload._id, function (err, user) {
        if (err) {
            console.log("Error in finding user from JWT");
            return;
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    })

}));


module.exports = passport;