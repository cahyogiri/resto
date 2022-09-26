const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const { application } = require('express');
const router = express.Router();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


let DB = [
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



/////////////////////////////////////////////////
/////////////////////////////////////////////////



router.get('/', function(req, res){
    res.render("pelanggan/index", {DB});
});

router.get('/new', function(req, res){
    res.render("pelanggan/new", {DB});
});

router.post('/', function(req, res){
    const tambahnomor = req.body.nomor
    const tambahjumlah = req.body.jumlah
    const tambahwaktu = req.body.waktu
    const tambahpelayanan = req.body.pelayanan
    let idterbesar = DB.reduce(
        (prev,cur)=>prev>cur.id?prev:cur.id,0
    )

    DB.push({
        id:idterbesar + 1,
        nomor:tambahnomor,
        jumlah:tambahjumlah,
        waktu:tambahwaktu,
        pelayanan:tambahpelayanan
    })
    res.redirect("/daftar");    
});

router.get('/:id/edit', function(req, res){
    const ubahid = req.params.id
    const data = DB.filter(data => data.id == ubahid)[0]
    res.render("pelanggan/edit", {data});
});

router.post('/:id/edit', function(req, res){
    const idubah = Number(req.params.id)
    const nomorubah = req.body.nomor
    const jumlahubah = req.body.jumlah
    const waktuubah = req.body.waktu
    const pelayananubah = req.body.pelayanan
    const dataubah = DB.filter(data => data.id !== idubah)
    DB = [
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

router.get('/:id/delete', function(req, res){
    const hapusid = req.params.id
    const data = DB.filter(data => data.id == hapusid)[0]
    res.render("pelanggan/delete", {data});
});

router.post('/:id/delete', function(req,res){
    const idhapus = Number(req.params.id)
    const hapussemua = DB.filter(data => data.id !== idhapus)
    DB = [
        ... hapussemua
    ]
    res.redirect("/daftar");
});








module.exports = router;