import mongoose from 'mongoose'

const chat_schema = new mongoose.Schema({
    sender:{
        type: String,
        require: true
    },
    receiver:{
        type:String,
        require:true,
    },
    message:{
        type:String
    },
    delivered:Boolean,
    seen:Boolean,
    day:Number,
    date:Number,
    month:Number,
    year:Number,
    hour:Number,
    minute:Number,
    second:Number
})


export default mongoose.model('chat', chat_schema)