const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');
const session = require('express-session');
const multer = require('multer');
const flash = require('connect-flash');

const app = express();

// Tentukan folder views dan layout
app.set('view engine', 'ejs');
app.set("views", path.resolve(__dirname, "views"));
app.use(expressLayouts);

// middleware untuk parsing body request
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// konfigurasi session
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        // max age 6 jam
        maxAge: 6 * 60 * 60 * 1000 // 6 jam dalam milidetik
    }
}));

app.use(flash());

// load assets
app.use("/css", express.static(path.resolve(__dirname, "assets/css")));
app.use("/img", express.static(path.resolve(__dirname, "assets/img")));
app.use("/js", express.static(path.resolve(__dirname, "assets/js")));

// middleware untuk menggunakan layout pada setiap halaman
app.use(express.static('public'));

// routes
app.use('/', require('./routes/route'));

// server
app.listen(3000, () => {
    console.log(`Server is listening on port 3000`);
});
