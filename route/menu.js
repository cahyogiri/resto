const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const { application } = require('express');
const router = express.Router();
app.set('view engine', 'ejs');
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



/////////////////////////////////////////////////
/////////////////////////////////////////////////


router.get('/', function(req, res){
    res.render("menu/index", {DB});
});

router.get('/new', function(req, res){
    res.render("menu/new", {DB});
});

router.post('/',(req,res) => {
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

router.get('/:id/edit', function(req, res){
    const idedit = req.params.id
    const data = DB.filter(data => data.id == idedit)[0]
    res.render("menu/edit", {data});
});

router.post('/:id/edit', function(req, res){
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

router.get('/:id/delete', function(req, res){
    const iddelete = req.params.id
    const data = DB.filter(data => data.id == iddelete)[0]
    res.render("menu/delete", {data});
});

router.post('/:id/delete', function(req, res){
    const deleteid = Number(req.params.id)
    const deleteall = DB.filter(data => data.id !== deleteid)
    DB = [
        ... deleteall
    ]
    res.redirect("/menu");
});







module.exports = router;