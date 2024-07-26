var mysql = require('mysql');

global.max_conv_id = 0;



//connecting the database
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123@sql",
    database: "orphanage",
    timezone: 'utc',
    port: 3306
  });
  con.connect(function(err) {
    if (err){
        console.log("check the connection please");
        throw err;
    }
    else{
      console.log("Connected to database");
    }
  });



//   var query = "SELECT max(id) as id FROM conversations;";
// con.query(query, function (err, result, fields) {
//   if (err) throw err;
//   if(result[0].id == null)
//   {
//     global.max_conv_id = 1;
//   }
//   else
//   {
//     global.max_conv_id = result[0].id + 1;
//   }
//   console.log("max conv id: " + result[0].id);
// });




module.exports.con = con;