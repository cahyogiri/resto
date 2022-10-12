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


app.use('/menu', menu);
app.use('/pelanggan', pelanggan);
app.use('/retail', retail)

app.get('/', function(req, res){
    res.render("home/index");
});

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//     next(createError(404));
//   });
  
// error handler
// app.use(function(err, req, res, next) {
//     // set locals, only providing error in development
//     res.locals.message = err.message;
//     res.locals.error = req.app.get('env') === 'development' ? err : {};
  
//     // render the error page
//     res.status(err.status || 500);
//     res.render('error');
// });
  




console.log("server berjalan")

app.listen(3000);