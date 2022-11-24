const User = require('../models/user');
const fs = require('fs');
const path = require('path');

module.exports.profile = function (req, res) {
    User.findById(req.params.id, function (err, user) {
        return res.render('user_profile', {
            title: 'User Profile',
            profile_user: user
        });
    });

}

module.exports.update = async function (req, res) {
    if (req.user.id == req.params.id) {
        // User.findByIdAndUpdate(req.params.id, req.body, function (err, user) {
        //     return res.redirect('back');
        // });

        try {
            let user = await User.findById(req.params.id);
            User.uploadedAvatar(req, res, function (err) {
                if (err) {
                    console.log("Multer error: ", err)

                }
                user.name = req.body.name;
                user.email = req.body.email;

                if (req.file) {

                    if (user.avatar) {
                        fs.unlinkSync(path.join(__dirname, '..', user.avatar));
                    }
                    // this is saving the path of uploaded file into avatar field in user 
                    user.avatar = User.avatarPath + '/' + req.file.filename;
                }
                console.log(user);
                user.save();
                return res.redirect('back');

            });

        } catch (err) {
            req.flash('error', err);
            return res.redirect('back');
        }
    } else {
        req.flash('error', 'Unauthorized');
        return res.status(401).send('Unauthorized');
    }
}

// Render Sign Up page
module.exports.signUp = function (req, res) {
    if (req.isAuthenticated()) {
        return res.redirect('/users/profile');
    }

    return res.render('user_sign_up', {
        title: 'Codeial | Sign Up'
    });
}

// Render Sign In page 
module.exports.signIn = function (req, res) {
    if (req.isAuthenticated()) {
        return res.redirect('/users/profile');
    }

    return res.render('user_sign_in', {
        title: 'Codeial | Sign In'
    });
}

// get Sign up data 
module.exports.create = function (req, res) {
    if (req.body.password != req.body.confirm_password) {
        req.flash('error', 'Passwords do not match');
        return res.redirect('back');
    }

    User.findOne({ email: req.body.email }, function (err, user) {
        if (err) { req.flash('error', err); return }

        if (!user) {
            User.create(req.body, function (err, user) {
                if (err) { req.flash('error', err); return }

                return res.redirect('/users/sign-in');
            });
        } else {
            req.flash('success', 'You have signed up, login to continue!');
            return res.redirect('back');
        }
    })
}

// Sign in and create a session 
module.exports.createSession = function (req, res) {
    req.flash('success', 'Logged in Successfully');
    return res.redirect('/');
}

module.exports.destroySession = function (req, res) {
    req.logout(function (err) {
        if (err) {
            console.log(err);
        }
    });

    req.flash('success', 'Logged out Successfully');
    return res.redirect('/');
};