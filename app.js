const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();


// Load routes;
const ideas = require('./routes/ideas');
const users = require('./routes/users');

//Connect to mongoose
mongoose.connect('mongodb://localhost/vidjot-dev')
.then(()=>{
  console.log('MongoDB Connected...')
}).catch(err =>{
  console.log(err);
});



app.engine('handlebars', exphbs({
  defaultLayout : 'main'
}));

app.set('view engine', 'handlebars');

// Body Parser middleware
app.use(bodyParser.urlencoded({ extended:false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

// Method override middleware
app.use(methodOverride('_method'));

// Express sessio nmiddleware
app.use(session({
  secret: '_secret_',
  resave: true,
  saveUninitialized: true,
}));

app.use(flash());

// Global variables

app.use(function(req, res, next){
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});


// Index route
app.get('/', (req, res) =>{
  const title = 'Welcome 2'
  res.render('index', {
    title:title
  });
});

// About route
app.get('/about', (req, res)=> {
  res.render('about')
});



// Use routes
app.use('/ideas', ideas);
app.use('/users', users);

const port = 5000;


app.listen(port, ()=> {
  console.log(`Sever escuchando en el puerto ${port}`);
});