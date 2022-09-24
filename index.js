const express = require('express');
const app = express();
app.set('view engine', 'ejs');
const bodyParser = require("body-parser");
const { application } = require('express');
const router = express.Router();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



let DBpelanggan = [
    {
        id:1,
        nomor:1,
        jumlah:5,
        waktu:"03.00",
        pelayanan:"sudah"
    },{
        id:2,
        nomor:3,
        jumlah:3,
        waktu:"04.00",
        pelayanan:"sudah"
    },{
        id:3,
        nomor:7,
        jumlah:2,
        waktu:"04.40",
        pelayanan:"sudah"
    },{
        id:4,
        nomor:15,
        jumlah:5,
        waktu:"05.30",
        pelayanan:"belum"
    },{
        id:5,
        nomor:11,
        jumlah:7,
        waktu:"05.35",
        pelayanan:"belum"
    }
]



/////////////////////////////////////////////
/////////////////////////////////////////////

const menu = require('./menu.js');

app.use('/menu', menu);










////////////////////////////////////////////////////


app.get('/', function(req, res){
    res.render("home");
});

app.get('/daftar', function(req, res){
    res.render("daftar", {DBpelanggan});
});

app.get('/daftar/tambah', function(req, res){
    res.render("tambah", {DBpelanggan});
});

app.post('/daftar', function(req, res){
    const tambahnomor = req.body.nomor
    const tambahjumlah = req.body.jumlah
    const tambahwaktu = req.body.waktu
    const tambahpelayanan = req.body.pelayanan
    let idterbesar = DBpelanggan.reduce(
        (prev,cur)=>prev>cur.id?prev:cur.id,0
    )

    DBpelanggan.push({
        id:idterbesar + 1,
        nomor:tambahnomor,
        jumlah:tambahjumlah,
        waktu:tambahwaktu,
        pelayanan:tambahpelayanan
    })
    res.redirect("/daftar");    
});

app.get('/daftar/:id/ubah', function(req, res){
    const ubahid = req.params.id
    const data = DBpelanggan.filter(data => data.id == ubahid)[0]
    res.render("ubah", {data});
});

app.post('/daftar/:id/ubah', function(req, res){
    const idubah = Number(req.params.id)
    const nomorubah = req.body.nomor
    const jumlahubah = req.body.jumlah
    const waktuubah = req.body.waktu
    const pelayananubah = req.body.pelayanan
    const dataubah = DBpelanggan.filter(data => data.id !== idubah)
    DBpelanggan = [
        ... dataubah,{
            id:idubah,
            nomor:nomorubah,
            jumlah:jumlahubah,
            waktu:waktuubah,
            pelayanan:pelayananubah
        }
    ]
    res.redirect("/daftar");
});

app.get('/daftar/:id/hapus', function(req, res){
    const hapusid = req.params.id
    const data = DBpelanggan.filter(data => data.id == hapusid)[0]
    res.render("hapus", {data});
});

app.post('/daftar/:id/hapus', function(req,res){
    const idhapus = Number(req.params.id)
    const hapussemua = DBpelanggan.filter(data => data.id !== idhapus)
    DBpelanggan = [
        ... hapussemua
    ]
    res.redirect("/daftar");
});







console.log("server berjalan")

app.listen(3000);