const mongoose = require("mongoose");

const OpenConnection = (server, database, user, pass) => {
    let constring = (user && pass ? `${user}:${pass}@` : '') + `${server}/${database}`;
    mongoose
        .connect(`mongodb://${constring}`, { useNewUrlParser: true })
        .then(() => console.log("Connected to MongoDB..."))
        .catch(err => console.error("Could not connect to MongoDB..."));
}
exports.OpenConnection = OpenConnection;