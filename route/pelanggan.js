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
    connection.query('SELECT * FROM pelanggan' , function (error, results, fields){
        if (error) console.log(error)
        let DB = []
        if(results.length > 0){
            DB = [...results]
        }
        res.render("pelanggan/index", {DB});
    })
});

router.get('/new', function(req, res){
    res.render("pelanggan/new");
});

router.post('/', function(req, res){
    const tambahnomor = req.body.nomor
    const tambahjumlah = req.body.jumlah
    const tambahwaktu = req.body.waktu
    const tambahpelayanan = req.body.pelayanan
    const query = `INSERT INTO pelanggan (id, nomor, jumlah, waktu, pelayanan) VALUES (NULL, '${tambahnomor}', '${tambahjumlah}', '${tambahwaktu}', '${tambahpelayanan}')`;
    connection.query(query , function (error, results, fields) {
        if (error) console.log(error)
    });
    res.redirect("/daftar");    
});

router.get('/:id/edit', function(req, res){
    const ubahid = req.params.id
    connection.query(`SELECT * FROM pelanggan WHERE id='${ubahid}'` , function (error, results, fields) {
        if (error) console.log(error)
        const data = results[0]
        res.render("pelanggan/edit", {data});
    });
});

router.post('/:id/edit', function(req, res){
    const idubah = Number(req.params.id)
    const nomorubah = req.body.nomor
    const jumlahubah = req.body.jumlah
    const waktuubah = req.body.waktu
    const pelayananubah = req.body.pelayanan
    connection.query(`UPDATE pelanggan SET nomor='${nomorubah}', jumlah='${jumlahubah}', waktu='${waktuubah}', pelayanan='${pelayananubah}' WHERE id='${idubah}'` , function (error, results, fields) {
        if (error) console.log(error)
        console.log(results)
    });
    res.redirect("/daftar");
});

router.get('/:id/delete', function(req, res){
    const hapusid = req.params.id
    connection.query(`SELECT * FROM pelanggan WHERE id='${hapusid}'` , function (error, results, fields) {
        if (error) console.log(error)
        const data = results[0]
        res.render("pelanggan/delete", {data});
    });
});   

router.post('/:id/delete', function(req,res){
    const idhapus = Number(req.params.id)
    connection.query(`DELETE FROM pelanggan WHERE id='${idhapus}'` , function (error, results, fields) {
        if (error) console.log(error)
        console.log(results)
    });
    res.redirect("/daftar");
});








module.exports = router;