const express = require('express')
const dotenv = require('dotenv')
const session = require("express-session")
dotenv.config();
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express();
const initDB = require('./database');
const authRoutes = require('./auth/controller')
const setupPassport = require('./passport');
const cookieparser = require('cookie-parser');
const ensureAuthenticated = require("./utils");

app.use(session({ secret: process.env.SECRET, resave: true, saveUninitialized: false }))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieparser());

app.use(cors({
  credentials: true,
}));

initDB();
setupPassport(app);



app.get('/test', ensureAuthenticated,  (req, res) => res.send('Tsoha App, please login'));
app.use('/api/', authRoutes);
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`tsoha listening on port ${PORT}!`));