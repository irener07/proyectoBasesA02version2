const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const session = require('express-session');
const app = express();
const router = express.Router();
const connectDb = require('./configuration/server');
const config = require('./configuration/connectDB');
connectDb();

module.exports = router;

app.use(router);
app.use(require('./routes/index'));
app.use(require('./routes/users'));
app.use(express.static(path.join(__dirname,'public')));
//app.use(express.static(__dirname + '/css'));
//app.use(express.static(__dirname + '/javascript'));
app.listen(config.PORT, ()=> console.log(`Server on port ${config.PORT}`));
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  layoutsDir: path.join(app.get('views'), 'layouts'),
  partialsDir: path.join(app.get('views'), 'partials'),
  extname: '.hbs'
}));
app.set('view engine', '.hbs');
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use(session({
  secret: 'tecPlaneApp',
  resave: true,
  saveUninitialized: true
}));