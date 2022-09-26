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

const menu = require('./menu.js');

app.use('/menu', menu);



const pelanggan = require('./pelanggan.js');

app.use('/daftar', pelanggan);

//////////////////////////////////////////////

app.get('/', function(req, res){
    res.render("home/index");
});






console.log("server berjalan")

app.listen(3000);