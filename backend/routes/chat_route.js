import {Router} from 'express'
import {add_chat, get_chat, get_chat2} from '../controllers/chat_conroller.js'
const chat_route = Router()



chat_route.post('/chat', (req, res)=>{
    add_chat(req, res)
})



chat_route.get('/chat/:userID', (req, res)=>{
    get_chat(req, res)
})


chat_route.get('/chat/:userID/:partnerID', (req, res)=>{
    get_chat2(req, res)
})





export default chat_route