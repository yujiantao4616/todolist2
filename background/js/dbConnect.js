const url = 'mongodb://localhost:27017/tosolist'; //数据库地址
const {
    MongoClient
} = require('mongodb');
let db

MongoClient.connect(url, {
    useNewUrlParser: true
}, function (err, dataBase) {
    if (err) throw err;
    db = dataBase.db('todolist')
});