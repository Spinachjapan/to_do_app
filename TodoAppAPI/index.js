const express = require("express");
const mysql = require('mysql');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded())

//database connection
const host = '<-- host -->';
const user = '<-- username -->';
const password = '<-- password -->';
const database = '<-- database name -->';


  app.get("/", (req, res) => {
    const connection = mysql.createConnection({
        host: host,
        user: user,
        password: password,
        database: database,
      });
    
    
      connection.connect();
      connection.query('SELECT * FROM titles ORDER BY id DESC', function (error, results, fields) {
          if (error) throw error;
          console.log(results);
          connection.end();
        res.send(results)
      });



  })


   app.post("/add",  function(req, res){


    const connection = mysql.createConnection({
      host: host,
      user: user,
      password: password,
      database: database,
    });
  
    connection.connect();
    connection.query('INSERT INTO titles (title) values(' + mysql.escape(req.body.todo) + ')', function (error, results, fields) {
        if (error) throw error;
        connection.end();

      });
      
     console.log(req.body.todo)
     res.send("added")
})



app.post("/delete_title",  function(req, res){


  const connection = mysql.createConnection({
    host: host,
    user: user,
    password: password,
    database: database,
  });


  connection.connect();
  connection.query('DELETE FROM titles WHERE id=' + mysql.escape(req.body.id), function (error, results, fields) {
      if (error) throw error;
      connection.end();

    });
    
   console.log(req.body.todo)
  res.send("deleted")
})












  app.listen(3000, () => console.log("Listening on port 3000"))

