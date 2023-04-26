const csv = require('csv-parser');
const fs = require('fs');
const routes = require("express").Router();

routes.get("/", async (req, res) => {

    res.status(200).json({
        message: "Hey, we are live !",
        status: "OK",
        statusCode: 200,
    });
});
// { limit: 100 }
routes.get("/trigger_report", async (req, res) => {
    try{
        const results = [];
        console.log("running")
        fs.createReadStream('D:/Soumil Assignement/node-express-backend-template/storestatus.csv')
          .pipe(csv({ limit: 100 }))
          .on('data', (data) => results.push(data))
          .on('end', () => {
            res.json(results);
        });
    }
    catch(err){
        console.log(err);
        return;
    }
    // res.status(200).json({
    //     message: "Trigger report !",
    //     status: "OK",
    //     statusCode: 200,
    // });
});

routes.get("/get_report", async (req, res) => {
    res.status(200).json({
        message: "Get report !",
        status: "OK",
        statusCode: 200,
    });
});

module.exports = routes;
