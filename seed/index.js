const {menuSeed} = require("./menu")
const {pelangganSeed} = require("./pelanggan")
const {retailSeed} = require("./retail")

// membuat data menu
menuSeed(200)

// membuat pelanggan baru
pelangganSeed(100)

// membuat data retail
retailSeed(200)