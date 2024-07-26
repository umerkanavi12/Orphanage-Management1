const express = require('express');
const router = express();
const bcrypt = require('bcryptjs');
const {con} = require('./database');
const {log} = require('./auth');
const path=require('path');
const {loginredirect} = require("./auth");

router.use(express.urlencoded({extended : true}));
router.use(express.json());

const check_user = function(username){

    return new Promise(function(resolve , reject){
      
      var sql_query = `SELECT * FROM credentials WHERE username = '${username}';`;
      con.query(sql_query, function (err, result, fields) {
        if (err) {
            return reject(err);
        }
        resolve(result[0]);
      });
    });
  };


router.get('/login' , async (req , res) => {
    // file_path = path.join(__dirname,"../files/html/login.html");
    // res.sendFile(file_path);

    var value = await loginredirect(req,res);
    if(value == 1){
        // res.send('alreadylogged in');
        res.redirect('/display_requirements')
    }
    else{
        res.render('login');
    }

})
router.post('/login',async (req,res) => {
    console.log(req.body);
    var body = req.body;
    var user;
    var userdata = {userid : body.id,
                username : body.username,
                password : body.password};
    
    await check_user(body.username).then((data) => {
        user = data;
    }).catch((err) => {
        console.log(err);
    });

    if(user!= undefined)
    {
        // console.log(userdata);
        bcrypt.compare(userdata.password, user.password, 
            async function (err, isMatch) {

            if (isMatch) {
                delete user.password
                req.session.user = user;
                res.status(200);
                log(res,req.session.user.username)
                

            }
    
            if (!isMatch) {

                console.log("password is worng");
                res.status(401).send("invalid credentials");
            }
        });
    }
    else
    {
        res.status(401).send("invalid credentials");
    }
    

});


router.get('/logout' ,(req,res) => {
    req.session.destroy();
    // res.clearCookie("userdata");
    res.redirect('/login')
});
module.exports = router;