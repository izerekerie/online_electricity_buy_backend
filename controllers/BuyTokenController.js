import Meter from '../models/meter';
import Token from '../models/token';

   export const buyToken= async(req,res)=>{
    const {id:_id} = req.params;   //Meter id
    const data=req.body;// MONEY  only
    let token = Math.floor(10000000 + Math.random() * 90000000);

 
    if(await Token.find({value:token})){
        token = Math.floor(10000000 + Math.random() * 90000000);
    
    
    }

  const newToken= new Token({dvalue:req.token,generateAt:new Date().toISOString(),days:(req.money/100)});
    try{
           
           await newToken.save();
           res.status(201).json(newToken);
           if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No meter with that id');
           const meter={_id,newToken}
           const meterUpdated=await Meter.findByIdAndUpdate(_id,meter,{new:true});

   }catch(error){
    // res.status(409).json({message:error.message});
    res.status(409).json(error.response.data);
   }
  }