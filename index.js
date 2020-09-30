const config = require("config");
const mongoose = require("mongoose");
const util = require("./util/index");
const routes = require("./routes/index");
const cors = require("cors");
const express = require("express");
const app = express();

const validateStart = () => {
    let _isvalide = true;
    if (!config.has("secret")) {
        console.error("FATAL ERROR: secret não definido.");
        _isvalide = false;
    }
    if (!config.has("mongo")) {
        console.error("FATAL ERROR: mongo não definido.");
        _isvalide = false;
    }
    if (!config.has("product")) {
        console.error("FATAL ERROR: product não definido.");
        _isvalide = false;
    }
    _isvalide ? _isvalide : process.exit(1);
}

function main(validate) {
    validate();
    let mongo = config.get("mongo");
    util.OpenConnection(mongo.server, mongo.database, mongo.user, mongo.pass);
    app.use(express.json());
    app.use(cors())

    app.use(function (req, res, next) {
        // Website you wish to allow to connect
        //res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4201');
        // // // Website you wish to allow to connect
         res.setHeader('Access-Control-Allow-Origin', '*');
        // Request methods you wish to allow
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        // Request headers you wish to allow
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        // Set to true if you need the website to include cookies in the requests sent
        // to the API (e.g. in case you use sessions)
        res.setHeader('Access-Control-Allow-Credentials', true);
        // Pass to next layer of middleware
        next();
      });
    
    //use users route for api/users
    app.use("/api", routes);

    const port = process.env.PORT || 3000;
    app.listen(port, () => console.log(`Listening on port ${port}...`));
}

main(validateStart);