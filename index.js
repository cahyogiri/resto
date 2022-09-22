const express = require('express');
const app = express();
app.set('view engine', 'ejs');

const bodyParser = require("body-parser");
const router = express.Router();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


let DB = [
    {id:0,
        nama:"nasi goreng",
        harga:"20.000"
    },{
        id:1,
        nama:"nasi pecel",
        harga:"5.500"
    },{
        id:2,
        nama:"nasi campur",
        harga:"10.000"
    }
];


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

app.get('/', function(req, res){
    res.send("Hello World");
});

app.get('/menu', function(req, res){
    res.render("menu", {DB});
});

app.get('/menu/new', function(req, res){
    res.render("new", {DB});
});

app.post('/menu',(req,res) => {
    const menunama = req.body.nama
    const menuharga = req.body.harga
    let idterbesar = DB.reduce(
        (prev,cur)=>prev>cur.id?prev:cur.id,0
     )
    DB.push({
        id:idterbesar + 1,
        nama:menunama,
        harga:menuharga
    })
    res.redirect("/menu");
});

app.get('/menu/:id/edit', function(req, res){
    const idedit = req.params.id
    const data = DB.filter(data => data.id == idedit)[0]
    res.render("edit", {data});
});

app.post('/menu/:id/edit', function(req, res){
    const editid = Number(req.params.id)
    const editnama = req.body.nama
    const editharga = req.body.harga
    const dataedit = DB.filter(data => data.id !== editid)
    DB = [
        ... dataedit,{
            id:editid,
            nama:editnama,
            harga:editharga
        }
    ]
    res.redirect("/menu");
});

app.get('/menu/:id/delete', function(req, res){
    const iddelete = req.params.id
    const data = DB.filter(data => data.id == iddelete)[0]
    res.render("delete", {data});
});

app.post('/menu/:id/delete', function(req, res){
    const deleteid = Number(req.params.id)
    const deleteall = DB.filter(data => data.id !== deleteid)
    DB = [
        ... deleteall
    ]
    res.redirect("/menu");
});


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