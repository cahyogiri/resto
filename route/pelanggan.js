const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const { application } = require('express');
const router = express.Router();
var createError = require('http-errors');
var path = require('path');
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

//index

router.get('/', function (req, res, next) {
    connection.query('SELECT * FROM pelanggan ORDER BY id desc', function (err, rows) {
        if (err) {
            req.flash('error', err);
            res.render('pelanggan', {
                data: ''
            });
        } else {
            res.render('pelanggan/index', {
                data: rows 
            });
        }
    });
});

// New

router.get('/new', function(req, res, ){
    res.render("pelanggan/new"), {
        nomor: '',
        jumlah: '',
        waktu: '',
        pelayanan: ''
    };
});

router.post('/', function(req, res, next) {
    const nomor     = req.body.nomor;
    const jumlah    = req.body.jumlah;
    const waktu     = req.body.waktu;
    const pelayanan = req.body.pelayanan;
    let errors      = false;

    if(nomor.length === 0) {
        errors = true;
        req.flash('error_nomor', "Silahkan Isi Nomor Meja")
    }

    if(nomor.length === 0) {
        errors = true;
        req.flash('error_jumlah', "Silahkan Isi Jumlah Pengunjung")
    }

    if(errors) {
        res.render('daftar/new', {
           nomor    : nomor,
           jumlah   : jumlah,
           pelayanan: pelayanan
        })
    }

    if(!errors) {

        let formData = {
            nomor    : nomor,
            jumlah   : jumlah,
            waktu    : waktu,
            pelayanan: pelayanan
        }
        
        connection.query('INSERT INTO pelanggan SET ?', formData, function(err, result) {
            if (err) {
                req.flash('error', err)
                res.render('daftar/new', {
                    nomor       : formData.nama,
                    jumlah      : formData.harga,
                    waktu       : formData.waktu,
                    pelayanan   : formData.pelayanan                    
                })
            } else {                
                req.flash('success', 'Data Berhasil Ditambah!');
                res.redirect('/daftar');
            }
        })
    }
})

// router.post('/', function(req, res){
//     const tambahnomor = req.body.nomor
//     const tambahjumlah = req.body.jumlah
//     const tambahwaktu = req.body.waktu
//     const tambahpelayanan = req.body.pelayanan
//     const query = `INSERT INTO pelanggan (id, nomor, jumlah, pelayanan) VALUES (NULL, '${tambahnomor}', '${tambahjumlah}', '${tambahpelayanan}')`;
//     connection.query(query , function (error, results, fields) {
//         if (error) console.log(error)
//     });
//     res.redirect("/daftar");    
// });

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
    connection.query(`UPDATE pelanggan SET nomor='${nomorubah}', jumlah='${jumlahubah}', pelayanan='${pelayananubah}' WHERE id='${idubah}'` , function (error, results, fields) {
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