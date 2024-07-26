const express = require('express');         
const app = express();
const session = require('express-session');  
var MySQLStore = require('express-mysql-session')(session); 
var cookieParser = require('cookie-parser');     
const ejsmate = require('ejs-mate');

app.use(express.urlencoded({extended : true}));
app.use(express.json());
app.use(cookieParser());
var options = {
	host: 'localhost',
	port: 3306,
	user: 'root',
	password: "123@sql",
	database: 'orphanage'
};

var sessionStore = new MySQLStore(options);

const add_user_and_logout = require('./routes/add_user');
// app.use(add_user_and_logout);


app.use(session({
	key: 'session_cookie_name',
	secret: 'session_cookie_secret',
	store: sessionStore,
	resave: false,
	saveUninitialized: true
}));

const con = require('./routes/database');
const add_user = require("./routes/add_user");
const login = require('./routes/login');
const {authorize} = require('./routes/auth');
const get_requirements = require('./routes/display_requirements');
const put_requirement = require('./routes/put_requirements')
// const backup = require('./routes/backup');



app.engine('ejs' , ejsmate)
app.set('view engine' , 'ejs');
app.set('views' , 'views')
app.use(express.static(__dirname + '/extras/css'));
app.use(express.static(__dirname + '/fonts'));
app.use(express.static(__dirname + '/extras'));
app.use(express.static(__dirname + '/extras/js'));
app.use(express.static(__dirname + '/extras/html'));
app.use(login);
app.use(add_user);
app.use(get_requirements);
app.use(put_requirement);

// app.use(about);

app.use(express.static(__dirname + '/images/'));
app.use(express.static(__dirname + '/routes/'));
app.use(express.static(__dirname + '/files/html/'));
app.use(express.static(__dirname + '/files/css/'));
app.use(express.static(__dirname + '/files/js/'));

app.get("/", (req, res) => {
	// res.redirect('/login')
	res.sendFile(__dirname + "/files/html/index.html");
  });

  app.get('/main' ,authorize,  (req , res) => {
    // file_path = path.join(__dirname,"../files/html/requirement.html");
    // res.sendFile(file_path);
    res.render("main_donor");
})

// app.get('/about', (req, res) => {
// 	res.sendFile(__dirname + "/files/html/gallery.html");
//    });

app.get('/about', (req, res) => {
	res.sendFile(__dirname + "/files/html/about.html");
});

app.get('/*', (req, res) => {
	res.send("there is no such page");
});
   
app.listen(4200 , ()=>{
    console.log('Project launched on port 4200');
});