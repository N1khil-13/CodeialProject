// const express = require('express');
// const env = require('./config/environment');
// const cookieParser = require('cookie-parser');
// const app = express();
// const port = 8000;
// const expressLayouts = require('express-ejs-layouts');
// const db = require('./config/mongoose');
// // Used for session cookie  
// const session = require('express-session');
// const passport = require('passport');
// const passportJWT = require('./config/passport-jwt-strategy');
// const passportLocal = require('./config/passport-local-strategy');
// const passportGoogle = require('./config/passport-google-oauth2-strategy');
// const MongoStore = require('connect-mongo');
// const sassMiddleware = require('node-sass-middleware');
// const flash = require('connect-flash');
// const customMware = require('./config/middleware');

// //  Setup the chat server 
// const chatServer = require('http').Server(app);
// const chatSockets = require('./config/chat_sockets').chatSockets(chatServer);
// chatServer.listen(5000);
// // const cors = require('cors');

// console.log('Chat server is listening on port 5000');

// const path = require('path');





// app.use(sassMiddleware({
//     src: path.join(__dirname, env.asset_path, 'scss'),
//     dest: path.join(__dirname, env.asset_path, 'css'),
//     // debug: true,
//     // outputStyle: 'extended',
//     prefix: '/css'
// }));

// app.use(express.urlencoded());

// app.use(cookieParser());

// app.use(express.static(env.asset_path));




// app.use('/uploads', express.static(__dirname + '/uploads'));

// app.use(expressLayouts);

// // Extract styles and scripts from subpages into layout 
// app.set('layout extractStyles', true);
// app.set('layout extractScripts', true);

// // Set up view engine
// app.set('view engine', 'ejs');
// app.set('views', './views');

// // mongo store is used to store the session cookie in the db

// app.use(session({
//     name: 'Codeial',
//     secret: env.session_cookie_key,
//     saveUninitialized: false,
//     resave: false,
//     cookie: {
//         maxAge: (1000 * 60 * 100)
//     },
//     store: MongoStore.create(
//         {
//             mongoUrl: 'mongodb://localhost/codeial_development',
//             autoRemove: 'disabled'
//         },
//         function (err) {
//             console.log(err || 'connect-mongodb setup ok')
//         }
//     )
// }));

// app.use(passport.initialize());
// app.use(passport.session());

// app.use(passport.setAuthenticatedUser);

// app.use(flash());
// app.use(customMware.setFlash);
// // Use Express router 
// app.use('/', require('./routes'));

// app.listen(port, function (err) {
//     if (err) {
//         console.log(`Error in running the server: ${err}`);
//     }

//     console.log(`Server is running on port: ${port}`);
// })

const express = require('express');
const env = require('./config/environment');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const app = express();

require('./config/view-helpers')(app);
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
// used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportJWT = require('./config/passport-jwt-strategy');
const passportGoogle = require('./config/passport-google-oauth2-strategy');

const MongoStore = require('connect-mongo');
const sassMiddleware = require('node-sass-middleware');
const flash = require('connect-flash');
const customMware = require('./config/middleware');

// setup the chat server to be used with socket.io
const chatServer = require('http').Server(app);
const chatSockets = require('./config/chat_sockets').chatSockets(chatServer);
chatServer.listen(5000);
console.log('chat server is listening on port 5000');


if (env.name == 'development') {
    app.use(sassMiddleware({
        src: './assets/scss',
        dest: './assets/css',
        debug: true,
        outputStyle: 'extended',
        prefix: '/css'
    }));
}

app.use(express.urlencoded());

app.use(cookieParser());

app.use(express.static('./assets'));
app.use(express.static('./public/assets'));
// make the uploads path available to the browser
app.use('/uploads', express.static(__dirname + '/uploads'));

app.use(logger(env.morgan.mode, env.morgan.options));

app.use(expressLayouts);
// extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);




// set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// mongo store is used to store the session cookie in the db
app.use(session({
    name: 'codeial',
    // TODO change the secret before deployment in production mode
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    // store: new MongoStore(
    //     {
    //         mongooseConnection: db,
    //         autoRemove: 'disabled'

    //     },
    //     function(err){
    //         console.log(err ||  'connect-mongodb setup ok');
    //     }rs

    // )
    store: MongoStore.create(
        {
            mongoUrl: 'mongodb://localhost/codeial_development',
            autoRemove: 'disabled'
        },
        function (err) {
            console.log(err || 'connect-mongodb setup ok')
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMware.setFlash);

// use express router
app.use('/', require('./routes'));


app.listen(port, function (err) {
    if (err) {
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server is running on port: ${port}`);
});
