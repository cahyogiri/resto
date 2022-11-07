const express = require('express');
const app = express();
app.set('view engine', 'ejs');
const bodyParser = require("body-parser");
const { application } = require('express');
const router = express.Router();
var createError = require('http-errors');
var path = require('path');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



/////////////////////////////////////////////
var flash   = require('express-flash');
var session = require('express-session');

/////////////////////////////////////////////

app.use(session({ 
cookie: { 
  maxAge: 60000 
},
store: new session.MemoryStore,
saveUninitialized: true,
resave: 'true',
secret: 'secret'
}))

app.use(flash())

const menu = require('./route/menu.js');
app.use('/menu', menu);

const pelanggan = require('./route/pelanggan.js');
app.use('/daftar', pelanggan);

const retail = require('./route/retail.js');
app.use('/retail', retail);

const latihan = require('./route/latihan.js');
app.use('/latihan', latihan);



app.get('/', function(req, res){
    res.render("home/index");
});



console.log("server berjalan")

app.listen(3000);