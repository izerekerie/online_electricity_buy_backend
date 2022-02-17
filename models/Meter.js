const mongoose=require('mongoose');

const MeterSchema= new mongoose.Schema({
    MeterId:{
        type:String,
        require:true
    },
    Days:{
        type:Number,
        require:true,
        default:0,
    }
});
mongoose.model('Meter',MeterSchema);