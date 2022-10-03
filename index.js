const express = require('express');
const app = express();
app.set('view engine', 'ejs');
const bodyParser = require("body-parser");
const { application } = require('express');
const router = express.Router();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



/////////////////////////////////////////////
/////////////////////////////////////////////

const menu = require('./route/menu.js');
app.use('/menu', menu);

const pelanggan = require('./route/pelanggan.js');
app.use('/daftar', pelanggan);

const retail = require('./route/retail.js');
app.use('/retail', retail);

//////////////////////////////////////////////

app.get('/', function(req, res){
    res.render("home/index");
});






console.log("server berjalan")

app.listen(3000);