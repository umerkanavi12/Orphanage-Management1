const express = require('express');
const { authorize } = require('./auth');
const router = express();
const {con} = require('./database');
const path=require('path');


router.get('/post_requirement' ,authorize,  (req , res) => {
    // file_path = path.join(__dirname,"../files/html/requirement.html");
    // res.sendFile(file_path);
    res.render("requirements");
})

router.get('/post_volunteer' ,authorize,  (req , res) => {
    // file_path = path.join(__dirname,"../files/html/requirement.html");
    // res.sendFile(file_path);
    res.render("volunteer");
})

router.post('/post_requirement',authorize , (req,res) => {

    var data = req.body;
    console.log(data);
    data.id = req.session
    // console.log(req.session.user);


    
        var query = `INSERT INTO requirement (orphanage_id,  category, item, quantity, emergency_value, type) VALUES ('${req.session.user.id}' , '${data.category}', '${data.item}', '${data.quantity}', '${data.emergencyValue}',0);`
        con.query(query, function (err, result, fields) {
            if(err)
            {
                console.log(err);
                res.status(401).send("invalid credentials");
            }
            else
            {
                // req.session.destroy();
                res.status(200).send("invalid credentials");
            }
        });

})



router.post('/post_volunteer',authorize , (req,res) => {

    var data = req.body;
    console.log(data);
    data.id = req.session
    // console.log(req.session.user);

        var query = `INSERT INTO requirement (orphanage_id,  category, item, quantity, emergency_value, type) VALUES ('${req.session.user.id}' , '${data.category}', '${data.item}', 0, 0 ,1);`
        con.query(query, function (err, result, fields) {
            if(err)
            {
                console.log(err);
                res.status(401).send("invalid credentials");
            }
            else
            {
                // req.session.destroy();
                res.status(200).send("invalid credentials");
            }
        });

})

module.exports = router;