const {faker} = require("@faker-js/faker");
const mysql = require('mysql');
const connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    database : 'resto'
});

function menuSeed(jumlah=0) {
    if(jumlah===0) console.log("menu tidak bertambah")
    
    else{
        const newMenu = []
        
        for (let index = 0; index < jumlah; index++) {
            newMenu.push([
                faker.color.human()+" "+faker.word.noun()+" "+faker.animal.type(),
                faker.finance.amount(1,150,0)*500
            ])
        }
        
        connection.connect(function(errcon){
            if (errcon) console.log(errcon)
            else connection.query('INSERT INTO menu (nama, harga) VALUES ?',[newMenu], function(err, result) {
                if (err) console.log(err)
                else console.log("sebanyak "+result.affectedRows+" data menu baru berhasil di input")
            })
            connection.end()
        })
    }    
}    
module.exports = {menuSeed}

