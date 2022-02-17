import mongoose from 'mongoose';

const TokenSchema= new mongoose.Schema({
   
    value:{
        type:Number,
        required:true,
    },
    Status:{
        type:Boolean,
        require:true,
        default:'Active',
    },
    days:{
        type:Number,
        require:true,
        default:0,
    },
    generatedAt:{
        type:Date,
        default:new Date()
    },

});
mongoose.model('Token',TokenSchema);