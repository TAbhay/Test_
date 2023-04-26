const mongoose = require("mongoose")

const businessSchema = new mongoose.Schema({  
    store_id: Number,
    dayOfWeek: Number,
    start_time_local: String,
    end_time_local: String
})

module.exports = mongoose.model("BusinessHours", businessSchema)