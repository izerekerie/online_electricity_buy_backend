import mongoose from 'mongoose';

export const MeterSchema= new mongoose.Schema({
   
   token:{
       type:String,
       required:true,
       default:'012345678'
   },
 
   
});
mongoose.model('Meter',MeterSchema);
