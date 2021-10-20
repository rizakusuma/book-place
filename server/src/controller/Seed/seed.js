

const axios  = require('axios');
var connection = require('../../utils/connection')



exports.seedBook = async function(req,res){
 
  let bookQuery = `SELECT * FROM BOOK;`
  connection.query(bookQuery, async (err, results) => {
    if (err) {
      res.send({
          message:err,
          code:401
      })
      res.end()
    }  
  

    if(results.length>1){
      res.send({
        message:'Already Seeded',  
        code:200
      })
      res.end()
    }
    else{
      const data1 = await axios.get("https://www.googleapis.com/books/v1/volumes?q=mental%20health&maxResults=40&startIndex=1");

      await Promise.all(data1.data.items.map(async(element)=>{
      
          let title = element.volumeInfo?.title ?? "";

          let author = element.volumeInfo?.authors ? 
          element.volumeInfo?.authors.length> 0?
           element.volumeInfo?.authors[0]:
            "":
           "";

          let description = element.volumeInfo?.description ?? "";    
          let preview = element.volumeInfo?.previewLink ?? "";
          let thumbnail = element.volumeInfo?.imageLinks?.thumbnail ?? ""; 
          let price = Math.floor(Math.random() * 10)+1;
  
          description = description.replace(/["]+/g, '');
          description = description.replace(/[“]+/g, '');
          description = description.replace(/[”]+/g, '');
          
         
          let query = `INSERT INTO BOOK(title, authors, description,thumbnail, preview, price) VALUES ("${title}", "${author}", "${description.substring(0,500)}","${thumbnail}","${preview}",${price});`
     
      
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
               
              });
  
            })
      }))
      const data2 = await axios.get("https://www.googleapis.com/books/v1/volumes?q=mental%20health&maxResults=40&startIndex=41");
      await Promise.all(data2.data.items.map(async(element)=>{
      
        let title = element.volumeInfo?.title ?? "";

        let author = element.volumeInfo?.authors ? 
        element.volumeInfo?.authors.length> 0?
         element.volumeInfo?.authors[0]:
          "":
         "";

        let description = element.volumeInfo?.description ?? "";    
        let preview = element.volumeInfo?.previewLink ?? "";
        let thumbnail = element.volumeInfo?.imageLinks?.thumbnail ?? ""; 
        let price = Math.floor(Math.random() * 10)+1;

        description = description.replace(/["]+/g, '');
        description = description.replace(/[“]+/g, '');
        description = description.replace(/[”]+/g, '');
        
       
        let query = `INSERT INTO BOOK(title, authors, description,thumbnail, preview, price) VALUES ("${title}", "${author}", "${description.substring(0,500)}","${thumbnail}","${preview}",${price});`
   
    
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
             
            });

          })
    }))
      res.send({
        message:'success',  
        code:200
      })
      res.end()
    }
  
  })
    
}