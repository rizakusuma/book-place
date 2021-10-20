var connection = require('../../utils/connection');
const config = require('../../utils/config');
const jwt = require('jsonwebtoken');


exports.getBook = function(req,res){
    var querySearch = req.query.q ?? "";
    let query;
    if(querySearch===""){
        query = `SELECT * FROM BOOK;`
    }   
    else{
        query = `SELECT * FROM BOOK WHERE title LIKE '%${querySearch}%';`
    }


    connection.query(query, (err, result)=>{
        if(err){
            res.send({
                message:err,
                code:401
            })
            res.end()
        }

        res.send({
            data:result,
            message:"success",
            code:200
        })
        res.end()
    });
}

exports.insertToCart = function(req,res){
    jwt.verify(req.token, config.secretkey, async (err, authData) => {
        if (err) {
          res.json({
            message: 'invalid token!'
          });
        }
        else {
            let idBook = req.body.id_book;
            let query = `INSERT INTO CART(id_book, id_user) VALUES (${idBook}, ${authData.id_user});`
            connection.query(query, async(err, result)=>{
                if(err){
                    res.send({
                        message:err,
                        code:401
                    })
                    res.end()
                }
                res.send({
                    message:"success",
                    code:200
                })
            })
        }
    })

}

exports.deleteCart = function(req,res){
    jwt.verify(req.token, config.secretkey, async (err, authData) => {
        if (err) {
          res.json({
            message: 'invalid token!'
          });
        }
        else {
            let idBook = req.params.id;
            let query = `DELETE FROM CART WHERE id_user = ${authData.id_user} and id_book = ${idBook};`
            connection.query(query, async(err, result)=>{
                if(err){
                    res.send({
                        message:err,
                        code:401
                    })
                    res.end()
                }
                res.send({
                    message:"success",
                    code:200
                })

            })
        }
    })

}

exports.getCart = function(req,res){
    jwt.verify(req.token, config.secretkey, async (err, authData) => {
        if (err) {
          res.json({
            message: 'invalid token!'
          });
        }
        else {
            let query = `SELECT * FROM CART WHERE id_user = ${authData.id_user};`
           
            connection.query(query, async(err, result)=>{
                if(err){
                    res.send({
                        message:err,
                        code:401
                    })
                    res.end()
                }

                var val = []
                var setValue = function (value) {
                   val.push(value);
                }
                await Promise.all(result.map(async(element)=>{

                    let getBookQuery = `SELECT * FROM BOOK WHERE id_book = ${element.id_book};`

                    await new Promise((resolve, reject) => {
                        connection.query(getBookQuery, (err, results) => {
                          if (err) {
                            res.send({
                                message:err,
                                code:401
                            })
                            res.end()
                          }  
                          setValue(results[0]);
                          resolve()   
                        })
                        
                    })


                }))

                res.send({
                    data:val,
                    message:"success",
                    code:200
                })


            })
        }
    })

}

exports.myLibrary = function(req,res){
    jwt.verify(req.token, config.secretkey, async (err, authData) => {
        if (err) {
          res.json({
            message: 'invalid token!'
          });
        }
        else {
            let query = `SELECT * FROM LIBRARY WHERE id_user = ${authData.id_user};`
           
            connection.query(query, async(err, result)=>{
                if(err){
                    res.send({
                        message:err,
                        code:401
                    })
                    res.end()
                }

                var val = []
                var setValue = function (value) {
                   val.push(value);
                }
                await Promise.all(result.map(async(element)=>{

                    let getBookQuery = `SELECT * FROM BOOK WHERE id_book = ${element.id_book};`

                    await new Promise((resolve, reject) => {
                        connection.query(getBookQuery, (err, results) => {
                          if (err) {
                            res.send({
                                message:err,
                                code:401
                            })
                            res.end()
                          }  
                          setValue(results[0]);
                          resolve()   
                        })
                        
                    })


                }))

                res.send({
                    data:val,
                    message:"success",
                    code:200
                })


            })


        }
    })

}

exports.checkout = function(req,res){

    jwt.verify(req.token, config.secretkey, async (err, authData) => {
        if (err) {
          res.json({
            message: 'invalid token!'
          });
        }
        else {
           
            var listBook = req.body.listBook;

            let totalPrice = 0;
            listBook.forEach(element => {
                totalPrice = totalPrice + element.price;
            });
            
    
            let checkCurrentCoin = `SELECT * FROM USERS WHERE username='${authData.username}';`

            connection.query(checkCurrentCoin, (err, result)=>{
                if(err){
                    res.send({
                        message:err,
                        code:401
                    })
                    res.end()
                }
       
                let currentCoin = result[0].coin
   
                if(  currentCoin < totalPrice){
                    res.send({
                        message:"Coin is not enough",
                        code:401
                    })
                    res.end()


                }
                else{
                    let updatedCoin = currentCoin - totalPrice;
         
                    let query = `UPDATE USERS set coin = ${updatedCoin} where username='${authData.username}';`
                    connection.query(query, async(err,result)=>{
                        if(err){
                            res.send({
                                message:err,
                                code:401
                            })
                            res.end()
                        }
 
                        await Promise.all(listBook.map(async(element)=>{

                            let query = `INSERT INTO LIBRARY (id_user, id_book) VALUES(${authData.id_user}, ${element.id_book});`

                            await new Promise((resolve, reject) => {
                                connection.query(query, (err, results) => {
                                  if (err) {
                                    res.send({
                                        message:err,
                                        code:401
                                    })
                                    res.end()
                                  }  
                                  resolve()         
                                 
                                })
                    
                            })


                        }));
                        let deleteFromCart = `DELETE FROM CART WHERE id_user = ${authData.id_user};`

                        connection.query(deleteFromCart, async(err,result)=>{
                            if(err){
                                res.send({
                                    message:err,
                                    code:401
                                })
                                res.end()
                            }
                            res.send({
                                message:"success",
                                data:{coin:updatedCoin},
                                code:200
                            })
                            res.end()
                        })
                      

                    })
                    

                }
        
               
            });
        }
    })


}