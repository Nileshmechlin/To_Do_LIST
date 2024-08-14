const express = require('express');
// const bodyparser = require('body-parser');
const cors = require ('cors');
const dotenv = require('dotenv')
const connection = require('./config/Db.connect')
const Authrouter = require('./routes/Authroute')
const todoRouter = require('./routes/todoroute')

dotenv.config();

const app = express();
const PORT = process.env.port||8080;


app.use(cors({
    origin :['http://localhost:5173'],
    methods:['GET', 'POST', 'PUT','DELETE'],
    credentials:true
}));

//middlware setups
app.use(express.json());
app.use(express.urlencoded({extended:true}));
//app.use(bodyparser.json());
//app.use(bodyparser.urlencoded({extended:true}));

//Route setups
app.use('/api/user',Authrouter);
app.use('/api/todo', todoRouter);

//database connection
connection();

//start server 
app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
});