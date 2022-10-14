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
    connection.query('SELECT * FROM menu ORDER BY id desc', function (err, rows) {
        if (err) {
            req.flash('error', err);
            res.render('menu', {
                data: ''
            });
        } else {
            res.render('menu/index', {
                data: rows 
            });
        }
    });
});

// New

router.get('/new', function(req, res, next){
    res.render("menu/new"), {
        nama: '',
        harga: ''
    }
});

router.post('/', function(req, res, next) {
    const nama = req.body.nama;
    const harga = req.body.harga;
    let errors = false;

    if(nama.length === 0) {
        errors = true;
        req.flash('error_nama', "Silahkan Masukkan Nama")
        res.render('menu/new', {
            nama: nama,
            harga: harga
        })
    }
    
    if(harga.length === 0) {
        errors = true;
        req.flash('error_harga', "Silahkan Masukkan Harga");
        res.render('menu/new', {
            nama: nama,
            harga: harga
        })
    }

    // if(errors) {
    //     req.render('menu/new', {
    //         nama: nama,
    //         harga: harga
    //     })
    // }

    if(!errors) {

        let formData = {
            nama: nama,
            harga: harga
        }
        
        connection.query('INSERT INTO menu SET ?', formData, function(err, result) {
            if (err) {
                req.flash('error', err)
                res.render('menu/new', {
                    title: formData.title,
                    content: formData.content                    
                })
            } else {                
                req.flash('success', 'Data Berhasil Ditambah!');
                res.redirect('/menu');
            }
        })
    }
});

// Edit

router.get('/(:id)/edit', function(req, res, next){
    let id = req.params.id;
   
    connection.query('SELECT * FROM menu WHERE id = ' + id, function(err, rows, fields) {
        if(err) throw err
         
        if (rows.length <= 0) {
            req.flash('error', 'Data Dengan ID ' + id + " Tidak Ditemukan")
            res.redirect('/menu')
        }
        else {
            res.render('menu/edit', {
                id:     rows[0].id,
                nama:   rows[0].nama,
                harga:  rows[0].harga
            })
        }
    })
});

router.post('/:id/edit', function(req, res, next){
    const id      = req.params.id;
    const nama    = req.body.nama;
    const harga   = req.body.harga;
    let errors  = false;

    if(nama.length === 0) {
        errors = true;
        req.flash('error_nama', "Silahkan Masukkan Nama");
        res.render('menu/edit', {
            id:         req.params.id,
            nama:       nama,
            harga:      harga
        })
    }

    if(harga.length === 0) {
        errors = true;
        req.flash('error_harga', "Silahkan Masukkan Harga");
        res.render('menu/edit', {
            id:         req.params.id,
            nama:       nama,
            harga:      harga
        })
    }

    if( !errors ) {   
 
        let formData = {
            nama: nama,
            harga: harga
        }

        connection.query('UPDATE menu SET ? WHERE id = ' + id, formData, function(err, result) {
            if (err) {
                req.flash('error', err)
                res.render('menu/edit', {
                    id:     req.params.id,
                    nama:   formData.nama,
                    harga:  formData.harga
                })
            } else {
                req.flash('success', 'Data Berhasil Diubah!');
                res.redirect('/menu');
            }
        })
    }
});

//Delete

router.get('/(:id)/delete', function(req, res, next){
    let id = req.params.id;
   
    connection.query('SELECT * FROM menu WHERE id = ' + id, function(err, rows, fields) {
        if(err) throw err
         
        if (rows.length <= 0) {
            req.flash('error', 'Data Dengan ID ' + id + " Tidak Ditemukan")
            res.redirect('/menu')
        }
        else {
            res.render('menu/delete', {
                id:     rows[0].id,
                nama:   rows[0].nama,
                harga:  rows[0].harga
            })
        }
    })
});

router.post('/:id/delete', function(req, res, next) {
    let id = req.params.id;
     
    connection.query('DELETE FROM menu WHERE id = ' + id, function(err, result) {
        if (err) {
            req.flash('error', err)
            res.redirect('/menu')
        } else {
            req.flash('success', 'Data Berhasil Dihapus!')
            res.redirect('/menu')
        }
    })
})


module.exports = router;