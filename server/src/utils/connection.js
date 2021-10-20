var bcrypt = require('bcryptjs');
var dateFormat = require('dateformat');
var mysql = require('mysql2');

var pool = mysql.createConnection({
    host: process.env.HOST_DB,
    user: process.env.USER_DB,
    password: process.env.PASSWORD_DB,
    database: process.env.DATABASE_DB
});

pool.connect(function (err) {
    if (err) {
        throw err;
    }
    let createUserTable= `CREATE TABLE IF NOT EXISTS USERS(
        id_user integer UNSIGNED auto_increment not null primary key,     
        username varchar(50) not null,
        password varchar(200) not null,
        coin integer not null,
        token varchar(50)     
        );`
    let createBookTable= `CREATE TABLE IF NOT EXISTS BOOK(
        id_book integer UNSIGNED auto_increment not null primary key,     
        title varchar(200) not null,
        authors varchar(50) not null,
        description varchar(500) not null,
        thumbnail varchar(500) not null,
        preview varchar(500) not null,
        price integer not null
        );`
    
  
    let createMyLibraryTable = `CREATE TABLE IF NOT EXISTS LIBRARY(
        id_library integer UNSIGNED auto_increment not null primary key,
        id_user integer unsigned not null,
        id_book integer unsigned not null,
        CONSTRAINT FOREIGN KEY (id_user) REFERENCES USERS(id_user),
        CONSTRAINT FOREIGN KEY (id_book) REFERENCES BOOK(id_book)    
        );`
    
    let createMyCartTable = `CREATE TABLE IF NOT EXISTS CART(
        id_cart integer UNSIGNED auto_increment not null primary key,
        id_user integer unsigned not null,
        id_book integer unsigned not null,
        CONSTRAINT FOREIGN KEY (id_user) REFERENCES USERS(id_user),
        CONSTRAINT FOREIGN KEY (id_book) REFERENCES BOOK(id_book)    
        );`
    
    pool.query(createUserTable, function (error, results, fields) {
        if (error) {
            throw error;
        }
        let query = `SELECT * FROM USERS;`
        pool.query(query, function (error, results) {
            if (error) {
                res.send({
                    auth: false,
                    message: error
                })
            }

            if (results.length === 0) {
                var hashedPassword = bcrypt.hashSync('password');
                let createUser = `INSERT INTO USERS(username, password,coin) 
                VALUES ('dummy','${hashedPassword}',15);`
                pool.query(createUser, function (error, results) {
                    if (error) {
                        console.log(error);
                    }
                })
            }
        });
    })

    
    pool.query(createBookTable, function (error, results, fields) {
        if (error) {
            throw error;
        }

        let query = `SELECT * FROM BOOK;`
        pool.query(query, function (error, results) {
            if (error) {
                res.send({
                    auth: false,
                    message: error
                })
            }
         
            if (results.length === 0) {
                let createBook = `INSERT INTO BOOK(title, authors, description,thumbnail, preview, price) VALUES ('This is Title', 'Idris Yoga', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.','http://books.google.com/books/content?id=DkvMRfC1dVIC&printsec=frontcover&img=1&zoom=1&source=gbs_api','http://books.google.co.id/books?id=m1CdbTd7r9gC&dq=mental+health&hl=&cd=10&source=gbs_api',3);`
                pool.query(createBook, function (error, results) {
                    if (error) {
                        console.log(error);
                    }
                })
            }
        });
    })
 
    pool.query(createMyLibraryTable, function (error, results, fields) {
        if (error) {
            throw error;
        }
      
        let query = `SELECT * FROM LIBRARY;`
        pool.query(query, function (error, results) {
            if (error) {
                res.send({
                    auth: false,
                    message: error
                })
            }
         
            if (results.length === 0) {

                let createLibrary = `INSERT INTO LIBRARY(id_user, id_book) VALUES (1,1);`
                pool.query(createLibrary, function (error, results) {
                    if (error) {
                        console.log(error);
                    }
                })
            }
        });
    }) 

    pool.query(createMyCartTable, function (error, results, fields) {
        if (error) {
            throw error;
        }
      
        let query = `SELECT * FROM CART;`
        pool.query(query, function (error, results) {
            if (error) {
                res.send({
                    auth: false,
                    message: error
                })
            }
         
            if (results.length === 0) {

                let createCart= `INSERT INTO CART(id_user, id_book) VALUES (1,1);`
                pool.query(createCart, function (error, results) {
                    if (error) {
                        console.log(error);
                    }
                })
            }
        });
    }) 
    
});

module.exports = pool;
