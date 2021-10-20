const BASE_URL = "/api/v1"

module.exports = function (app) {
    var token = require('./utils/auth');

    //SEEDER ENDPOINT
    var seeder = require('./controller/Seed/seed');
    app.route(`${BASE_URL}/seed`) 
        .get(seeder.seedBook)

   
    //AUTH ENDPOINT
    var auth = require('./controller/Auth/auth');
    app.route(`${BASE_URL}`) 
        .get(auth.initial)
    app.route(`${BASE_URL}/auth/token`)
        .post(auth.token)
    app.route(`${BASE_URL}/auth/logout`)
        .get(token.verifyToken, auth.logout)
    app.route(`${BASE_URL}/auth/login`)
        .post(auth.login)
    app.route(`${BASE_URL}/auth/register`)
        .post(auth.register)

    
    //BOOK ENDPOINT
    var book  = require("./controller/Book/book");
    app.route(`${BASE_URL}/books`)
        .get(book.getBook); 

    app.route(`${BASE_URL}/books/checkout`)
        .post(token.verifyToken,book.checkout);

    app.route(`${BASE_URL}/books/library`)
        .get(token.verifyToken,book.myLibrary);
    
    app.route(`${BASE_URL}/books/cart`)
        .get(token.verifyToken,book.getCart);
    
    app.route(`${BASE_URL}/books/cart`)
        .post(token.verifyToken,book.insertToCart);
   
    app.route(`${BASE_URL}/books/cart/:id`)
        .delete(token.verifyToken,book.deleteCart);

};
