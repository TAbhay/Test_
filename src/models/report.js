const mongoose = require("mongoose")

const reportSchema = new mongoose.Schema({  
    store_id: Number,
    uptime_last_hour: Number,
    uptime_last_day: Number,
    update_last_week: Number,
    downtime_last_hour: Number,
    downtime_last_day: Number,
    downtime_last_week: Number
})

module.exports = mongoose.model("Report", reportSchema)