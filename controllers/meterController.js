
import {MeterSchema} from '../models/meter';
import {TokenSchema} from '../models/token';
import mongoose from 'mongoose'
 export const getMeters= async(req,res)=>{
   try{
  const meters=  await Meter.find();
  res.status(200).json(postMessages)
   }catch(error){
 res.status(404).json({message:error.message});
   }
}
export const getMeter=async(req,res)=>{
  try{
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No Meter with that id');
   const meter= await Meter.findById(id);
    res.status(200).json(meter);
  }catch(error){
res.status(404).json({message:error.message});
  }
}



export const createMeter= async(req,res)=>{
    const meter=req.body;

  const newMeter= new Meter({...meter,token:req.token});
    try{
           await newMeter.save();
           res.status(201).json(newMeter);

   }catch(error){
    // res.status(409).json({message:error.message});
    res.status(409).json(error.response.data);
   }
  }

   export const updateMeter = async(req,res)=>{
     const {id:_id} = req.params;
     const meter=req.body;
     if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No meter with that id');
    const meterUpdated=await Meter.findByIdAndUpdate(_id,meter,{new:true});

    res.json(meterUpdated);
    console.log("updated")
   }

   export const deleteMeter= async(req,res)=>{
    const {id:_id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No meter with that id');
    await Meter.findByIdAndDelete(_id);
    res.json({message:'meter delete sucessfully'})
   }


   export const checkRemainingdays= async(req,res)=>{
    const {id:_id} = req.params;
    
    
    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No meter with that id');
    const meter= await Meter.findById(id);
     const token=await Token.find({value:meter.token})

    res.json(token.days)
   }


   