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


router.get('/', function(req, res){
    res.render("latihan/index");
});

router.get('/x1', function(req, res){
    let x1 = '';

    for( let i = 0; i < 5; i++) {
        for( let j = 0; j <= i; j++) {
            x1 += 'x';
        }
        x1 += '\n';
    }
    console.log(x1)
    res.render('latihan/x1', {
        x1 : x1
    })
});

router.get('/x2', function(req, res){
    let x2 = '';

    for(let i = 5; i > 0; i-- ) {
        for(let j = 0; j < i; j++) {
            x2 += 'x';
        }
        x2 += '\n';
    }
    console.log(x2)
    res.render("latihan/x2", {
        x2 : x2
    })
});

router.get('/x3', function(re, res) {
    let x3 = ''

    for(let i = 0; i < 5; i++) {
        if(i % 2 == 0) {
            console.log('x')
        }else{
        if(i % 2 != 0) {
            console.log('xxxxx')
            }
        }
    }   
    res.render("latihan/x3", {
        x3 : x3
    })
})

router.get('/x4', function(re, res) {
    let x4 = ''

        for( let i = 1; i <= 5; i++) {
        x4 += i
        for( let j = 1; j < i; j++) {
            x4 += 'x'
        }
        x4 += '\n'
    }
    console.log(x4)
    res.render("latihan/x4", {
        x4 : x4
    })
})

module.exports = router;