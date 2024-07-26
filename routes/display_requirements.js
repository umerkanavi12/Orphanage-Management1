const express = require('express');
const { authorize } = require('./auth');
const router = express();
const {con} = require('./database');




const fetch_all_requirements = function(){

    return new Promise(function(resolve , reject){
      
      var sql_query = `SELECT * FROM requirement WHERE fullfilled = 0 and type = 0 ORDER BY emergency_value DESC;`
      con.query(sql_query, function (err, result, fields) {
        if (err) {
            return reject(err);
        }
        resolve(result);
      });
    });
  };

category = {
    1: "Food",
    2: "Cloths",
    3: "Stationary",
    4: "Toys",
    5: "Funds",
    6: "Medical Care",
}

router.get('/display_requirements',authorize , async (req,res) => {

    var data = req.body;
    data.id = req.session
    // console.log(req.session.user);

    await fetch_all_requirements().then((data) => {
        data.category = category[data.category];
        // console.log(data);

        res.render('show_requirements' , {data : {requirements: data}});
    }).catch((err) => {
        console.log(err);
    });

    // console.log(requirement);

})



const fetch_requirement = function(id){

  return new Promise(function(resolve , reject){
    
    var sql_query = ` SELECT r.*, o.*
    FROM requirement r
    JOIN orphanage o ON r.orphanage_id = o.id
    WHERE r.requirement_id = '${id}';`
    con.query(sql_query, function (err, result, fields) {
      if (err) {
          return reject(err);
      }
      resolve(result[0]);
    });
  });
};


const fetch_posted = function(id){

  return new Promise(function(resolve , reject){
    
    var sql_query = ` SELECT r.*
    FROM requirement r
    WHERE r.orphanage_id = '${id}' and r.fullfilled = 0 and r.type = 0
    ORDER BY requirement_id DESC;`
    con.query(sql_query, function (err, result, fields) {
      if (err) {
          return reject(err);
      }
      resolve(result);
    });
  });
};


const fetch_donations = function(id){

  return new Promise(function(resolve , reject){
    
    var sql_query = `SELECT *
    FROM donations
    JOIN doner ON donations.doner_id = doner.id
    JOIN requirement ON donations.requirement_id = requirement.requirement_id and requirement.type = 0
    WHERE requirement.orphanage_id = '${id}';
    `
    con.query(sql_query, function (err, result, fields) {
      if (err) {
          return reject(err);
      }
      resolve(result);
    });
  });
};



router.get('/donate/:id' , authorize,async (req,res) => {
  const rid = req.params.id;

  await fetch_requirement(rid).then((data) => {

    // console.log(data);
    res.render('donate' , {data});

  }).catch((err) => {
      console.log(err);
  });

  // res.render("donate")

})

router.post('/donate',async(req,res)=>{
  var data = req.body;
  id = req.session.user.id

  console.log(data);

  fullfilled = ((data.old_quantity - data.donated_quantity) <= 0) ? 1 : 0;

  try {
    await con.beginTransaction();

    await con.query(`UPDATE requirement SET quantity = ${data.old_quantity - data.donated_quantity}, fullfilled = ${fullfilled} WHERE requirement_id = ${data.requirement_id};`);

    await con.query(`INSERT INTO donations (doner_id,  requirement_id , dquantity) VALUES (${req.session.user.id} , ${data.requirement_id}, ${data.donated_quantity});`);

    await con.commit();
    res.status(200).send('Transaction committed successfully.');

  } catch (error) {

    await con.rollback();
    console.log('Transaction rolled back due to an error:', error);

    res.status(401).send("invalid credentials");

  }
  // console.log(req.session.user);

})


router.get('/display_posted',authorize , async (req,res) => {

  id = req.session.user.id
  // console.log(req.session.user);

  await fetch_posted(id).then((data) => {
      data.category = category[data.category];
      // console.log(data);

      res.render('display_posted' , {data : {requirements: data}});
  }).catch((err) => {
      console.log(err);
  });

  // console.log(requirement);

})


router.get('/donations_made',authorize , async (req,res) => {

  id = req.session.user.id
  // console.log(req.session.user);

  await fetch_donations(id).then((data) => {
      // data.category = category[data.category];
      // console.log(data);
      // res.send("hi");

      res.render('display_donations' , {data : {requirements: data}});
  }).catch((err) => {
      console.log(err);
  });

  // console.log(requirement);

})



const fetch_volunteer = function(){


  return new Promise(function(resolve , reject){
    
    var sql_query = ` SELECT r.*, o.*
    FROM requirement r
    JOIN orphanage o ON r.orphanage_id = o.id
    WHERE r.type = 1
    ORDER BY r.emergency_value DESC;`
    con.query(sql_query, function (err, result, fields) {
      if (err) {
          return reject(err);
      }
      resolve(result);
    });
  });
};

router.get('/volunteer',authorize , async (req,res) => {

  id = req.session.user.id
  // console.log(req.session.user);

  await fetch_volunteer().then((data) => {
      data.category = category[data.category];
      // console.log(data);

      res.render('display_volunteer' , {data : {requirements: data}});
  }).catch((err) => {
      console.log(err);
  });

  // console.log(requirement);

})


const fetch_posted_volunteer = function(id){

  return new Promise(function(resolve , reject){
    
    var sql_query = ` SELECT r.*
    FROM requirement r
    WHERE r.orphanage_id = '${id}' and r.fullfilled = 0 and r.type = 1
    ORDER BY requirement_id DESC;`
    con.query(sql_query, function (err, result, fields) {
      if (err) {
          return reject(err);
      }
      resolve(result);
    });
  });
};


router.get('/posted_volunteer',authorize , async (req,res) => {

  id = req.session.user.id
  // console.log(req.session.user);

  await fetch_posted_volunteer(id).then((data) => {
      data.category = category[data.category];
      
      // console.log(data);

      res.render('show_volunteer' , {data : {requirements: data}});
  }).catch((err) => {
      console.log(err);
  });

})


router.delete('/delete/:id' , authorize,async (req,res) => {
  const rid = req.params.id;
  console.log(rid);

  con.query('DELETE FROM requirement WHERE requirement_id = ?', [rid], (error, results) => {
    if (error) {
      console.error('Error deleting resource:', error);
      res.status(500).send('Internal Server Error');
    } else if (results.affectedRows === 0) {
      console.log(`Resource with ID ${rid} not found`);
      res.status(404).send('Resource Not Found');
    } else {
      console.log(`Resource with ID ${rid} deleted successfully`);
      res.sendStatus(204); // No Content
    }
  });

})



module.exports = router;