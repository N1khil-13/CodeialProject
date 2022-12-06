const nodemailer = require('../config/nodemailer');

// Another way of exporting methods 
exports.newComment = (comment) => {
    // console.log('inside new comment mailer');
    let htmlString = nodemailer.renderTemplate({ comment: comment }, '/comments/new_comment.ejs');

    nodemailer.transporter.sendMail({
        from: 'shettynikhil1903@gmail.com',
        to: comment.user.email,
        subject: "New comment published!",
        html: htmlString
    }, (err, info) => {

        if (err) {
            console.log('Error in sending mail', err);
            return;
        }

        console.log('Message sent', info);
        return;
    });
}