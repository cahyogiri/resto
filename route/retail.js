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

// index

router.get('/', function (req, res, next) {
    let take = req.query.take ?? 10
    let skip = req.query.skip ?? 0
    connection.query(`SELECT * FROM retail ORDER BY id desc LIMIT ${take} OFFSET ${skip}`, function (err, rows) {
        if (err) {
            req.flash('error', err);
            res.render('retail', {
                data: ''
            });
        } else {
            res.render('retail/index', {
                data: rows 
            });
        }
    });
});

// New

router.get('/new', function(req, res){
    res.render("retail/new", {
        nama: '',
        harga_beli: '',
        harga_jual: ''
    });
});

router.post('/', function(req, res, next) {
    const nama = req.body.nama;
    const harga_beli = req.body.harga_beli;
    const harga_jual = req.body.harga_jual;
    let errors = false;

    if(nama.length === 0) {
        errors = true;
        req.flash('error_nama', "Silahkan Masukkan Nama") 
    }
    
    if(harga_beli.length === 0) {
        errors = true;
        req.flash('error_hargabeli', "Silahkan Masukkan Harga Beli");
    }

    if(harga_jual.length === 0) {
        errors = true;
        req.flash('error_hargajual', "Silahkan Masukkan Harga Jual");
    }

    if(errors) {
        res.render('retail/new', {
            nama: nama,
            harga_beli: harga_beli,
            harga_jual: harga_jual
        })
    }

    if(!errors) {

        let formData = {
            nama: nama,
            harga_beli: harga_beli,
            harga_jual: harga_jual
        }
        
        connection.query('INSERT INTO retail SET ?', formData, function(err, result) {
            if (err) {
                req.flash('error', err)
                res.render('retail/new', {
                    nama: formData.nama,
                    harga_beli: formData.harga_beli,
                    harga_jual: formData.harga_jual                    
                })
            } else {                
                req.flash('success', 'Data Berhasil Ditambah!');
                res.redirect('/retail');
            }
        })
    }
});

// Edit

router.get('/(:id)/edit', function(req, res, next){
    let id = req.params.id;
   
    connection.query('SELECT * FROM retail WHERE id = ' + id, function(err, rows, fields) {
        if(err) throw err
         
        if (rows.length <= 0) {
            req.flash('error', 'Data Dengan ID ' + id + " Tidak Ditemukan")
            res.redirect('/retail')
        }
        else {
            res.render('retail/edit', {
                id:     rows[0].id,
                nama:   rows[0].nama,
                harga_beli:  rows[0].harga_beli,
                harga_jual:  rows[0].harga_jual
            })
        }
    })
});

router.post('/:id/edit', function(req, res, next){
    const id      = req.params.id;
    const nama    = req.body.nama;
    const harga_beli   = req.body.harga_beli;
    const harga_jual   = req.body.harga_jual;
    let errors  = false;

    if(nama.length === 0) {
        errors = true;
        req.flash('error_nama', "Silahkan Masukkan Nama")
    }

    if(harga_beli.length === 0 || harga_beli < 1000) {
        errors = true;
        req.flash('error_hargabeli', "Silahkan Masukkan Harga")
    }

    if(harga_jual.length === 0 || harga_jual < 1000) {
        errors = true;
        req.flash('error_hargajual', "Silahkan Masukkan Harga")
    }

    if(errors) {
        res.render('retail/edit', {
            id: req.params.id,
            nama: nama,
            harga_beli: harga_beli,
            harga_jual: harga_jual
        })
    }

    if( !errors ) {   
 
        let formData = {
            nama: nama,
            harga_beli: harga_beli,
            harga_jual: harga_jual
        }

        connection.query('UPDATE retail SET ? WHERE id = ' + id, formData, function(err, result) {
            if (err) {
                req.flash('error', err)
                res.render('retail/edit', {
                    id:     req.params.id,
                    nama:   formData.nama,
                    harga_beli:  formData.harga_beli,
                    harga_jual:  formData.harga_jual
                })
            } else {
                req.flash('success', 'Data Berhasil Diubah!');
                res.redirect('/retail');
            }
        })
    }
});

// Delete

router.get('/(:id)/delete', function(req, res, next){
    let id = req.params.id;
   
    connection.query('SELECT * FROM retail WHERE id = ' + id, function(err, rows, fields) {
        if(err) throw err
         
        if (rows.length <= 0) {
            req.flash('error', 'Data Dengan ID ' + id + " Tidak Ditemukan")
            res.redirect('/retail')
        }
        else {
            res.render('retail/delete', {
                id:     rows[0].id,
                nama:   rows[0].nama,
                harga_beli:  rows[0].harga_beli,
                harga_jual:  rows[0].harga_jual
            })
        }
    })
});

router.post('/:id/delete', function(req, res, next) {
    let id = req.params.id;
     
    connection.query('DELETE FROM retail WHERE id = ' + id, function(err, result) {
        if (err) {
            req.flash('error', err)
            res.redirect('/retail')
        } else {
            req.flash('success', 'Data Berhasil Dihapus!')
            res.redirect('/retail')
        }
    })
})


module.exports = router;