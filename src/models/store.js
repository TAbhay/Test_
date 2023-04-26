const mongoose = require("mongoose")

const storeSchema = new mongoose.Schema({  
    store_id: Number,
    timestamp_utc: Date,
    status: String
})

module.exports = mongoose.model("Store", storeSchema)