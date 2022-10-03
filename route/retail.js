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
    connection.query('SELECT * FROM retail ', function(error, results, fields) {
        if (error) console.log(error)
        let DB = []
        if(results.length > 0){
            DB = [...results]
        }
        res.render("retail/index", {DB})
    });
});

router.get('/new', function(req, res){
    res.render("retail/new");
});

router.post('/', (req, res ) => {
    const retailnama = req.body.nama
    const retailbeli = req.body.harga_beli
    const retailjual = req.body.harga_jual
    const query = `INSERT INTO retail (id, nama, harga_beli, harga_jual) VALUES (NULL, '${retailnama}', '${retailbeli}', '${retailjual}')`;
    connection.query(query, function (error, results, fields) {
        if (error) console.log(error)
    });
    res.redirect("/retail");
});

router.get('/:id/edit', function(req, res) {
    const idedit = req.params.id
    connection.query(`SELECT * FROM retail WHERE id='${idedit}'`, function (error, results, fields) {
        if (error) console.log(error)
        const data = results[0]
        res.render("retail/edit", {data});
    });
});

router.post('/:id/edit', function(req, res) {
    const editid = Number(req.params.id)
    const editnama = req.body.nama
    const editbeli = req.body.harga_beli
    const editjual = req.body.harga_jual
    connection.query(`UPDATE retail SET nama='${editnama}', harga_beli='${editbeli}', harga_jual='${editjual}' WHERE id='${editid}'` , function(error, results, fields) {
        if (error) console.log (error)
    });
    res.redirect("/retail");
});

router.get('/:id/delete', function(req, res){
    const iddelete = req.params.id
    connection.query(`SELECT * FROM retail WHERE id='${iddelete}'` , function(error, results, fields) {
        if (error) console.log(error)
        const data = results[0]
        res.render("retail/delete", {data})
    })
})

router.post('/:id/delete', function(req, res) {
    const deleteid = Number(req.params.id)
    connection.query(`DELETE FROM retail WHERE id='${deleteid}'` , function(error, results, fields) {
        if (error) console.log(error)
    });
    res.redirect("/retail");
});







module.exports = router;