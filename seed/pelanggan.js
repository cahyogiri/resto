const {faker} = require("@faker-js/faker");
const mysql = require('mysql');
const connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    database : 'resto'
});

function pelangganSeed(jumlah=0) {
    if(jumlah===0) console.log("pelanggan tidak bertambah")
    
    else{
        const newPelanggan = []
        
        for (let index = 0; index < jumlah; index++) {
            newPelanggan.push([
                faker.finance.amount(1,50,0),
                faker.finance.amount(1,20,0),
                faker.date.past(2022),
                0
            ])
        }
        
        connection.connect(function(errcon){
            if (errcon) console.log(errcon)
            else connection.query('INSERT INTO pelanggan (nomor, jumlah, waktu, pelayanan) VALUES ?',[newPelanggan], function(err, result) {
                if (err) console.log(err)
                else console.log("sebanyak "+result.affectedRows+" data pelanggan baru berhasil di input")
            })
            connection.end()
        })
    }    
}    
module.exports = {pelangganSeed}

