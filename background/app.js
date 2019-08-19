const fs = require('fs')
const express = require('express')
const path = require('path')

const url = 'mongodb://localhost:27017/tosolist'; //数据库地址
const {
    MongoClient
} = require('mongodb');
let db;
const messageCode = '1111' //短信验证码

MongoClient.connect(url, {
    useNewUrlParser: true
}, function (err, dataBase) {
    if (err) throw err;
    db = dataBase.db('todolist')
});
var app = express()

app.use(express.static(__dirname + '/build'));
app.all("*", (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Content-Type,Content-Length, Authorization, Accept,X-Requested-With"
    );
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", " 3.2.1");
    if (req.method == "OPTIONS") res.send(200);
    /*让options请求快速返回*/
    else next();
});
app.post('/login', (req, res) => {
    req.on('data', chunk => {
        //解析传过来的参数
        let loginData = JSON.parse(chunk.toString())
        let loginStatus = {
            code: -1,
            message: ''
        }
        //查找数据库中的用户信息
        db.collection('userMes').find({
            userPhone: loginData.loginPhone
        }).toArray((err, doc) => {
            //status 0 账号不存在 1 登录成功 2 密码错误
            if (err) throw 'Error'
            else if (doc.length) {
                if (doc[0].password !== loginData.loginPwd) {
                    //密码不匹配
                    loginStatus = {
                        code: 2,
                        message: '账号或密码错误'
                    }
                } else {
                    loginStatus = {
                        code: 1,
                        message: '登录成功'
                    }
                }
            } else {
                //不存在账号，请注册
                loginStatus = {
                    code: 0,
                    message: '账号不存在，请注册'
                }
            }
            res.send(JSON.stringify(loginStatus))
        })

    })
})
app.post('/sign', (req, res) => {
    req.on('data', (chunk) => {
        let signData = JSON.parse(chunk.toString())
        let signStatus = {
            code: -1,
            message: ''
        }
        db.collection('userMes').find({
            userPhone: signData.phoneNumber
        }, {
            limite: 1
        }).toArray((err, doc) => {
            //目前还属于测试阶段，没有对短信验证码进行检查
            if (err) throw err
            else if (doc.length === 1) {
                signStatus = {
                    code: 1, //账号已存在，类似于通过手机验证码的形式进行登录
                    message: ''
                }
            } else {
                signStatus = {
                    code: 0, //账号不存在，等用户设置完密码再把用户的数据插入
                    message: ''
                }
                // db.collection('userMes').insert({
                //     userPhone: signData.phoneNumber
                // })
            }
            res.send(signStatus)
        })
    })
})
app.post('/setPwd', (req, res) => {
    req.on('data', chunk => {
        var data = JSON.parse(chunk.toString())
        if (data.componentType === 3) {
            db.collection('userMes').insertOne(data).then(result => {
                //result 插入数据库的执行结果
                res.send({
                    code: 1,
                    message: '注册成功'
                })
            })
        } else {
            db.collection('userMes').update({
                userPhone: data.userPhone
            }, {
                userPhone: data.userPhone,
                password: data.password
            }).then(result => {
                //result 插入数据库的执行结果
                res.send({
                    code: 1,
                    message: '注册成功'
                })
            })
        }


    })
})
app.post('/checkPhone', (req, res) => {
    //检测账号是否存在于数据库中，或者检验是否为已注册的账号
    req.on('data', (chunk) => {
        let data = JSON.parse(chunk.toString())
        console.log(data)
        let reactMes = {
            code: -1,
            message: ''
        } //返回的消息

        db.collection('userMes').find({
            userPhone: data.phoneNumber
        }).toArray((err, doc) => {
            if (err) throw err
            else if (doc.length === 1) {
                if (data.messageCode === messageCode) {
                    reactMes = {
                        code: 1, //账号已存在，类似于通过手机验证码的形式进行登录
                        message: '账号已存在'
                    }
                } else {
                    res.send({
                        code: 2, //账号已存在，类似于通过手机验证码的形式进行登录
                        message: '验证码不正确'
                    })
                }
            } else {
                reactMes = {
                    code: 0, //账号不存在，等用户设置完密码再把用户的数据插入
                    message: '账号不存在'
                }
            }
            res.send(reactMes)
        })

    })
})
app.listen(8080, () => {
    console.log('server on port 8080')
})