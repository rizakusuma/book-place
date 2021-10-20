const jwt = require('jsonwebtoken');
const config = require('../../utils/config');
var randtoken = require('rand-token');
const helper = require('../../utils/helpers');

var connection = require('../../utils/connection')
var bcrypt = require('bcryptjs');

var dateFormat = require('dateformat');
const refreshTokens = {};


exports.initial = function(req,res){
    res.status(200).send
    ({ 
        message: `Hello World ${new Date()}`, 
     });
}

exports.token = function (req, res, next) {
    var username = req.body.username  
    var refreshToken = req.body.refreshToken
    if ((refreshTokens[refreshToken].refreshToken === refreshToken) && (refreshTokens[refreshToken].username === username)) {
        var token = jwt.sign({
            username: username
        }, config.secretkey, {
            expiresIn: 300
        })
        refreshTokens[refreshToken].token = token
        res.json({
            token: 'Bearer ' + token
        })
    } else {
        res.sendStatus(401)
    }
}

exports.register = function(req, res){
   
    var username = req.body.username;
    var password = req.body.password
    
    var hashedPassword = bcrypt.hashSync(password);



    var val = []
    var setValue = function (value) {
        val = value;
    }
    let validateUsername = `SELECT * FROM USERS WHERE (username = '${username}') ;`
        connection.query(validateUsername, (err, result)=>{
            if(err){
                res.send({
                    message:err,
                    code:401
                })
                res.end()
            }
            setValue(result)
            var string = JSON.stringify(val)
            var users = JSON.parse(string)
            if(users != 0){
                res.send({
                    message:"Username already exists",
                    code:401
                })
                
            }
            else{
                let createUser = `INSERT INTO USERS(username, password,coin) 
                VALUES ('${username}','${hashedPassword}',15);`

                
                connection.query(createUser, (error, result) => {
                    if (error) {
                        res.send({
                            message: error,
                            code:401,          
                        })
                    
                        res.end()
                    }
                    else{
                        res.send({
                            message:'success',  code:200
                        })
                        res.end()
                    }
                })
            }
         
             


            })
    
        
    }


    exports.login = function (req, res) {
    
        var username = req.body.username
        var password = req.body.password
        let query = `SELECT * FROM USERS WHERE (username = '${username}');`
  

        var val = []
        var setValue = function (value) {
            val = value;
        }
        connection.query(query, (error,results)=> {
        
         
        setValue(results);
    
        var stringUser = JSON.stringify(val)
        var userDetails = JSON.parse(stringUser)
      

        if (stringUser === '[]') {
            res.send({
                auth: false,
                message: "Invalid Username",
                code:401
            })
            res.end()
        } else {
            var passwordIsValid = bcrypt.compareSync(password, userDetails[0].password);
            if (!passwordIsValid) {
                res.send({
                    auth: false,
                    message: "Invalid Password!",
                    code:401
                });
                res.end()
            } else {         
              
                var token = jwt.sign({
                    username: userDetails[0].username,
                    id_user:userDetails[0].id_user
                }, config.secretkey, {
                    expiresIn: 86400 // expires in 24 hours
                });
          
                var refreshToken = randtoken.uid(256);
                refreshTokens[refreshToken] = {
                    username: userDetails[0].username,
                    coin:userDetails[0].coin,
                    token: token,
                    refreshToken: refreshToken,
                    id_user:userDetails[0].id_user,
                }
                res.send({
                    data:{
                        auth: true,
                        token: token,
                        refreshToken: refreshToken,
                        coin:userDetails[0].coin,
                        username:userDetails[0].username,
                        id_user:userDetails[0].id_user,
                    },
                    message:helper.successMessage.status,        
                    status:helper.status.success,            
                });               
                res.end()             

            }
        }

    });
   
}

exports.logout = function (req, res) {
    jwt.verify(req.token, config.secretkey, (err, authData) => {
        if (err) {
            res.json({
                message: "invalid token!",
                code:401
            });
        } else {
            res.status(200).send({
                auth: false,
                token: null
            });
        }
        res.end()
    });
}

