import {Router} from 'express'
import { get_users, get_user, post_users, update_user, delete_users, get_users1, get_users_search } from '../controllers/users_controller.js'
const users_route = Router()


users_route.post('/signin', (req, res)=>{
    get_users(req, res)
})


users_route.get('/user/:id', (req, res)=>{
    get_user(req, res)
})


users_route.get('/users', (req, res)=>{
    get_users1(req, res)
})


users_route.get('/users/search/:searchValue', (req, res)=>{
    get_users_search(req, res)
})


users_route.post('/users', (req, res)=>{
    post_users(req, res)
})



users_route.patch('/users/:id', (req, res)=>{
    update_user(req, res)
})



users_route.delete('/users/:id', (req, res)=>{
    delete_users(req, res)
})





export default users_route