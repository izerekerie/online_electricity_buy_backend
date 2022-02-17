
const mongoose= require('mongoose')
const cors= require('cors')
const dotenv= require('dotenv')
const express=require('express')
dotenv.config();

// const foodController =require('./controllers/foodController')
 var app =express()
const bodyParser=require('body-parser')
app.use(bodyParser.json());
 app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));

 app.get('/',(req,res)=>{
     res.send('welcome to our app');
 });
// app.use('/api/foods',foodController);

const PORT=process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true,

})
.then(()=>app.listen(PORT,console.log(`server running on port: ${PORT}`)))

.catch(err=>console.log('failed to connect to mongodb', err.message));


