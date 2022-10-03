const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const { application } = require('express');
const router = express.Router();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var mysql = require('mysql');
var connection = mysql.createConnection({
    host : 'localhost',
    port:'3306',
    user : 'root',
    password : '',
    database : 'resto'
});


/////////////////////////////////////////////////
/////////////////////////////////////////////////


router.get('/', function(req, res){
    connection.query('SELECT * FROM menu ' , function (error, results, fields) {
        if (error) console.log(error)
        let DB = []
        if(results.length > 0){
            DB = [...results]
        }
        res.render("menu/index", {DB});
    });


});

router.get('/new', function(req, res){
    res.render("menu/new");
});

router.post('/',(req,res) => {
    const menunama = req.body.nama
    const menuharga = req.body.harga
    const query = `INSERT INTO menu (id, nama, harga) VALUES (NULL, '${menunama}', '${menuharga}')`;
    connection.query(query , function (error, results, fields) {
        if (error) console.log(error)
    });
    res.redirect("/menu");
});

router.get('/:id/edit', function(req, res){
    const idedit = req.params.id
    connection.query(`SELECT * FROM menu WHERE id='${idedit}'` , function (error, results, fields) {
        if (error) console.log(error)
        const data = results[0]
        res.render("menu/edit", {data});
    });
});

router.post('/:id/edit', function(req, res){
    const editid = Number(req.params.id)
    const editnama = req.body.nama
    const editharga = req.body.harga
    connection.query(`UPDATE menu SET nama='${editnama}', harga='${editharga}' WHERE id='${editid}'` , function (error, results, fields) {
        if (error) console.log(error)
        console.log(results)
    });
    res.redirect("/menu");
});

router.get('/:id/delete', function(req, res){
    const iddelete = req.params.id
    connection.query(`SELECT * FROM menu  WHERE id='${iddelete}'` , function (error, results, fields) {
        if (error) console.log(error)
        const data = results[0]
        res.render("menu/delete", {data});
    });
});

router.post('/:id/delete', function(req, res){
    const deleteid = Number(req.params.id)
    connection.query(`DELETE FROM menu WHERE id='${deleteid}'` , function (error, results, fields) {
        if (error) console.log(error)
        console.log(results)
    });
    res.redirect("/menu");
});







module.exports = router;