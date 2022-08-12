import chat from '../models/chat_model.js'

const add_chat = async (req, res)=>{
    const {sender, receiver, message, day, date, month, year, hour, minute, second} = req.body
    const add_chat_to_chat = await chat.create({
        sender:sender,
        receiver:receiver,
        message:message,
        day:day,
        date:date,
        month:month,
        year:year,
        hour:hour,
        minute:minute,
        second:second,
        delivered:true,
        seen:false
    })
    res.json(add_chat_to_chat)
}



const get_chat = async(req, res)=>{
    const {id} = req.params
    const get_chat_from_chat = await chat.find({
        sender:id
    })
    res.json(get_chat_from_chat)
}




export {add_chat, get_chat}