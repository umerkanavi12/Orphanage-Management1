// const express = require('express');
// const router = express();
// const {con} = require('./database');
// const {authorize} = require('./auth');

// let has_access = function(id , project_id)
// {
//     return new Promise(function(resolve , reject){
//         var query = `Select * from project_access where project_id = ${project_id} and emply_id = ${id};`
//         con.query(query , function(err , result , fields){
//             if(err)
//             {
//                 return reject(err);
//             }
//             if(result[0]!= null && result[0].emply_id == id)
//             {
//                 resolve(true);
                
//             }
//             else{
//                 resolve(false);
                
//             }
//         })
//     })
// }

// let get_conv = function(project_id){

//     return new Promise(function(resolve , reject){
//       var id = 0;
//       var sql_query = `SELECT * FROM conversations WHERE project_id = ${project_id} ORDER BY convo_id DESC;`
//       con.query(sql_query, function (err, result, fields) {
//         if (err) {
//             return reject(err);
//         }
//         resolve(result);
//       });
//     });
//   };

// router.get('/conversation' ,authorize, async (req,res)=>{
//     var data = req.query;
//     var has = false;
//     await has_access(req.session.user.userid , data.project_id).then((result)=>{
//         has = result;
//     }).catch((err)=>{
//         console.log(err);
//     });

//     if(has == false)
//     {
//         return res.send("you dont have access to the project");
//     }
//     else
//     {
//         await get_conv(data.project_id).then((result) => {
//             // console.log(result);
//             return res.status(200).send(result);
//           }).catch((err) => {
    
//               console.log(err);
//           });
//     }

    

// })

// router.post('/add_access',authorize , (req,res)=>{
//     var data = req.body;
    
//     var query = `INSERT IGNORE INTO project_access (emply_id , project_id , role) VALUES (${data.emply_id} , ${data.project_id} , '${data.role}');`
//     con.query(query, function (err, result, fields) {
//         if (err && err.errno == 1452)
//         {
//             res.send('The project or the emply id is not registered');
//         }
//         else{
//             res.send("access given");
//         }
//     });

// });

// module.exports = router;