import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import users_route from './routes/users_route.js'
import chat_route from './routes/chat_route.js'

const dbconnection = mongoose.connect("mongodb://localhost:27017/whatsappclone",
()=>{console.log("Successfully connected to database")})
export const app = express()
app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use('/', users_route)
app.use('/', chat_route)





const port = 3001
app.listen(port, ()=>{console.log(`Listening at port ${port}`)})