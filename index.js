import {meterRoutes} from './routes/meter.js'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from'dotenv'
import express from 'express'
dotenv.config();


 var app =express()
import  bodyParser from 'body-parser'
app.use(bodyParser.json());
 app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));

 app.get('/',(req,res)=>{
     res.send('welcome to our app');
 });

app.use('/api/meters',meterRoutes);

const PORT=process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true,

})
.then(()=>app.listen(PORT,console.log(`server running on port: ${PORT}`)))

.catch(err=>console.log('failed to connect to mongodb', err.message));


