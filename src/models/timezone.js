const mongoose = require("mongoose")

const timeZoneSchema = new mongoose.Schema({  
    store_id: Number,
    timezone_str: String
})

module.exports = mongoose.model("Timezone", timeZoneSchema)