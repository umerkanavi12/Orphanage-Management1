const express = require('express');
const router = express();
const bcrypt = require('bcryptjs');
const {con} = require('./database');
// const {authorize} = require('./auth');


router.use(express.urlencoded({extended : true}));
router.use(express.json());




const fetch_id = function(){

    return new Promise(function(resolve , reject){
      
      var sql_query = `SELECT id FROM credentials WHERE id = (SELECT MAX(id) FROM credentials)`
      con.query(sql_query, function (err, result, fields) {
        if (err) {
            return reject(err);
        }
        resolve(result[0]);
      });
    });
  };



router.post('/add_orphanage',async (req,res)=>{
    var data = req.body;
    const bcrypt = require('bcryptjs');
    console.log(data);
  
    var hased_password;



    await fetch_id().then((data) => {
        id = data.id;
    }).catch((err) => {
        console.log(err);
    });


    id = id + 1



 // Encryption of the string password
    bcrypt.genSalt(10, function (err, Salt) {
    
        // The bcrypt is used for encrypting password.
        bcrypt.hash(data.password, Salt,  function (err, hash) {
    
            if (err) {
                return console.log('Cannot encrypt',err);
            }
            
            var query = `INSERT INTO credentials (id, username , password, what) VALUES (${id},'${data.email}' , '${hash}', 1);`
            con.query(query, function (err, result, fields) {
                if (err && err.errno == 1062)
                {
                    res.send('The emply is already registered');

                }
                else if(err)
                {
                    console.log(err);
                }
                else{
                    // req.session.destroy();
                    var query = `INSERT INTO orphanage (id,email , name, address) VALUES (${id},'${data.email}' , '${data.name}','${data.address}');`
                    con.query(query, function (err, result, fields) {
                        if (err && err.errno == 1062)
                        {
                            res.status(401).send('The emply is already registered');

                        }
                        else if(err)
                        {
                            res.status(500);
                            console.log(err);

                        }
                        else{
                            // req.session.destroy();
                            res.status(200).send("new user added");

                        }
                    });
                }
            });
            
        });
    });  
});


router.post('/register_doner',async (req,res)=>{
    var data = req.body;
    const bcrypt = require('bcryptjs');
    console.log(data);
    await fetch_id().then((data) => {
        id = data.id;
    }).catch((err) => {
        console.log(err);
    });

    id = id + 1
  
    var hased_password;
// Encryption of the string password
    bcrypt.genSalt(10, function (err, Salt) {
    
        // The bcrypt is used for encrypting password.
        bcrypt.hash(data.password, Salt,  function (err, hash) {
    
            if (err) {
                return console.log('Cannot encrypt',err);
            }
            var query = `INSERT INTO credentials (id ,username , password, what) VALUES (${id},'${data.email}' , '${hash}',2);`
            con.query(query, function (err, result, fields) {
                if (err && err.errno == 1062)
                {
                    res.send('The emply is already registered');
                }
                else if(err)
                {
                    console.log(err);
                }
                else{
                    // req.session.destroy();
                    var query = `INSERT INTO doner (id,email , fname, lname) VALUES (${id},'${data.email}' , '${data.firstName}','${data.lastName}');`
                    con.query(query, function (err, result, fields) {
                        if (err && err.errno == 1062)
                        {
                            res.status(401).send('The emply is already registered');
                        }
                        else if(err)
                        {
                            res.status(500);
                            console.log(err);

                        }
                        else{
                            // req.session.destroy();
                            res.status(200).send("new user added");
                        }
                    });
                }
            });
            
            
        });
    });  
});



router.get('/doner_registration' , async (req , res) => {

    res.render('add_doner');

});

router.get('/orphanage_registration' , async (req , res) => {

    res.render('add_orphanage');

});


module.exports = router;