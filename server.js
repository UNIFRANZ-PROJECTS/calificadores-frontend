const express = require('express');
const port = process.env.PORT || 8081;
const app = express();
// require('dotenv').config();

app.use(express.static(__dirname + "/dist/"));
app.get(/.*/, function(req, res){
    res.sendfile(__dirname + "/dist/index.html")
});
app.listen(port);
console.log("server started... ");
console.log(port);
console.log("server started...");