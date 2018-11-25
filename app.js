const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

mongoose.connect(config.database);

// database connection 
mongoose.connection.on('connected', () => {
    console.log('Connected to Database'+ config.database); 
});

mongoose.connection.on('error', (err) => {
    console.log('Database Error'+ err); 
});

const app = express();

const users = require('./routes/users');
const jwtVerify = require('./middlewares/jwt-verify');
const accessControl = require('./middlewares/access-control');

//port number
const port = 5000;

// cors for cross-origin ports
app.use(cors());

// Body parser Middleware
app.use(bodyParser.json());
app.use(jwtVerify);
app.use(accessControl);

app.use('/users', users);
app.use('/courses',require('./routes/course'));
app.use('/classes',require('./routes/class'));
app.use('/students',require('./routes/student'));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req,res) => {
    res.send('Invalid Url');
})

app.listen(port, () => {
    console.log('server started on port'+ port);
});
