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
    let take = req.query.take ?? 10 
    let skip = req.query.skip ?? 0 
    connection.query(`SELECT * FROM pelanggan ORDER BY id desc LIMIT ${take} OFFSET ${skip}`, function (err, rows) {
        if (err) {
            req.flash('error', err);
            res.render('daftar', {
                data: ''
            });
        } else {
            res.render('daftar/index', {
                data: rows 
            });
        }
    });
});

// New

router.get('/new', function(req, res, ){
    res.render("daftar/new"), {
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

    if(jumlah.length === 0) {
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
                    pelayanan   : formData.pelayanan                    
                })
            } else {                
                req.flash('success', 'Data Berhasil Ditambah!');
                res.redirect('/daftar');
            }
        })
    }
})

// Edit

router.get('/(:id)/edit', function(req, res, next){
    let id = req.params.id;
   
    connection.query('SELECT * FROM pelanggan WHERE id = ' + id, function(err, rows, fields) {
        if(err) throw err
         
        if (rows.length <= 0) {
            req.flash('error', 'Data Dengan ID ' + id + " Tidak Ditemukan")
            res.redirect('/daftar')
        }
        else {
            res.render('daftar/edit', {
                id:         rows[0].id,
                nomor:      rows[0].nomor,
                jumlah:     rows[0].jumlah,
                pelayanan:  rows[0].pelayanan
            })
        }
    })
});

router.post('/:id/edit', function(req, res, next){
    const id        = req.params.id;
    const nomor     = req.body.nomor;
    const jumlah    = req.body.jumlah;
    const waktu     = req.body.waktu;
    const pelayanan = req.body.pelayanan;
    let errors  = false;

    if(nomor.length === 0) {
        errors = true;
        req.flash('error_nomor', "Silahkan Isi Nomor Meja")
    }

    if(jumlah.length === 0) {
        errors = true;
        req.flash('error_jumlah', "Silahkan Isi Jumlah Pelanggan")
    }

    if(errors) {
        res.render('daftar/edit', {
            id: req.params.id,
            nomor    : nomor,
            jumlah   : jumlah,
            pelayanan: pelayanan
        })
    }

    if( !errors ) {   
 
        let formData = {
            nomor    : nomor,
            jumlah   : jumlah,
            pelayanan: pelayanan
        }

        connection.query('UPDATE pelanggan SET ? WHERE id = ' + id, formData, function(err, result) {
            if (err) {
                req.flash('error', err)
                res.render('daftar/edit', {
                    id:     req.params.id,
                    nomor       : formData.nama,
                    jumlah      : formData.harga,
                    pelayanan   : formData.pelayanan
                })
            } else {
                req.flash('success', 'Data Berhasil Diubah!');
                res.redirect('/daftar');
            }
        })
    }
});

// Delete

router.get('/(:id)/delete', function(req, res, next){
    let id = req.params.id;
   
    connection.query('SELECT * FROM pelanggan WHERE id = ' + id, function(err, rows, fields) {
        if(err) throw err
         
        if (rows.length <= 0) {
            req.flash('error', 'Data Dengan ID ' + id + " Tidak Ditemukan")
            res.redirect('/daftar')
        }
        else {
            res.render('daftar/delete', {
                id:         rows[0].id,
                nomor:      rows[0].nomor,
                jumlah:     rows[0].jumlah,
                pelayanan:  rows[0].pelayanan
            })
        }
    })
});

router.post('/:id/delete', function(req, res, next) {
    let id = req.params.id;
     
    connection.query('DELETE FROM pelanggan WHERE id = ' + id, function(err, result) {
        if (err) {
            req.flash('error', err)
            res.redirect('/daftar')
        } else {
            req.flash('success', 'Data Berhasil Dihapus!')
            res.redirect('/daftar')
        }
    })
})


module.exports = router;