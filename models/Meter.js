import mongoose from 'mongoose';

 const MeterSchema= new mongoose.Schema({
   userName:{
       type:String,
       required:true,
       
   },
   token:{
       type:String,
       required:true,
       default:'012345678'
   },
 
   
});

export default mongoose.model('Meter',MeterSchema);