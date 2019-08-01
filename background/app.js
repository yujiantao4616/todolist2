const {
    MongoClient
} = require('mongodb');
const fs = require('fs')
const express = require('express')
const path = require('path')
var app = express()
app.use(express.static(__dirname + '/build'));

app.get('/', (req, res) => {
    res.type('text/html')
    var data = fs.readFileSync('./build/index.html')
    res.render('./build/index.html')
})
const url = 'mongodb://localhost:27017';
// MongoClient.connect(url, {
//     useNewUrlParser: true
// }, function (err, db) {
//     if (err) throw err;
//     console.log("数据库已创建!");
//     db.close();
// });
app.listen(3000, () => {
    console.log('server on port 3000')
})