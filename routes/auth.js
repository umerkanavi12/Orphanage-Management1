const express = require('express');
const router = express();
const {con} = require('./database');



const orphanage_routes = ['/post_requirement',"/display_requirements","/display_posted","/donations_made","/post_volunteer","/posted_volunteer","/delete/:id"]
const doner_routes = ["/display_requirements","/donate/:id","/main","/volunteer"]

const check_user = function(username){

    return new Promise(function(resolve , reject){
      
      var sql_query = `SELECT username , id , what FROM credentials WHERE username = '${username}';`;
      con.query(sql_query, function (err, result, fields) {
        if (err) {
            return reject(err);
        }
        resolve(result[0]);
      });
    });
  };

  async function authorize (req , res, next){
    // console.log(req.session);

    if(req.session.user != undefined){
        var data;
        await check_user(req.session.user.username).then((result) => {
            // console.log(result);
            data = result;
            if(!data){
                res.status(401).redirect('/login');
            }else{

                route = req.route.path;
                console.log(route);

             
                if (data.what == 1 && orphanage_routes.includes(route) ) 
                {
                    next();   
                    return;
                }
                else if (data.what == 2 && doner_routes.includes(route) ) 
                {
                    next();   
                    return;
                }
                else if(data.what == 1)
                {
                    res.redirect('/display_posted');
                }
                else if(data.what == 2)
                {
                    res.redirect('/main');
                }
                
               
            }
        }).catch((err) => {
            console.log(err);
        });
    }
    else{
        return res.status(401).redirect('/login');
    }
}


async function log (res,username){
    // console.log(req.session);

    if(username != undefined){
        var data;
        await check_user(username).then((result) => {
            // console.log(result);
            data = result;
            if(!data){
                res.status(401).redirect('/login');
            }else{

                // route = req.route.path;
                if(data.what == 1)
                {
                    res.redirect('/display_posted');
                }
                else if(data.what == 2)
                {
                    res.redirect('/main');
                }
                
               
            }
        }).catch((err) => {
            console.log(err);
        });
    }
    else{
        return res.status(401).redirect('/login');
    }
}



async function loginredirect (req , res){
    // console.log(res.session);
    
    if(req.session.user != undefined){ 
            return 1;
        }
        return 0;

}

module.exports.authorize = authorize;
module.exports.loginredirect = loginredirect;
module.exports.log = log;



