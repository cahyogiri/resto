const {faker} = require("@faker-js/faker");
const mysql = require('mysql');
const connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    database : 'resto'
});

function retailSeed(jumlah=0) {
    if(jumlah===0) console.log("retail tidak bertambah")
    
    else{
        const newRetail = []
        
        for (let index = 0; index < jumlah; index++) {
            const harga_beli =  faker.finance.amount(1,20,0)*500
            const harga_jual =  harga_beli + faker.finance.amount(1,20,0)*500
            newRetail.push([
                faker.animal.type(),
                harga_beli,
                harga_jual
            ])
        }
        
        connection.connect(function(errcon){
            if (errcon) console.log(errcon)
            else connection.query('INSERT INTO retail (nama, harga_beli, harga_jual) VALUES ?',[newRetail], function(err, result) {
                if (err) console.log(err)
                else console.log("sebanyak "+result.affectedRows+" data retail baru berhasil di input")
            })
            connection.end()
        })
    }    
}    
module.exports = {retailSeed}

