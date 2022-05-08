//requiring dependencies
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path')
const pug = require('pug');

//setup the mongoose 
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/test');
}

//mongoose error handling
const db = mongoose.connection;
db.on('error',console.error.bind(console,'connection failed'));

db.once('open',()=>{console.log('connection to db success')})

const app = express();
const PORT = 8080;

app.use(express.static('public'))
app.set('views',path.join(__dirname,'views'));
app.set('view engine','pug');

//middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))

//require routers
const userRouter = require('./routes/user');

//using the imported route
app.use('/',userRouter);


app.listen(PORT,()=>{console.log(`listening on port ${PORT}`)})