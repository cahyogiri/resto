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

app.get('/:nama/berhasil', function(req, res){
    const a = req.params.nama
    res.render("berhasilnew" ,{a});
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











console.log("server berjalan")

app.listen(3000);