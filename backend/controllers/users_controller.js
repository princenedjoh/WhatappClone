import users_model from "../models/users_model.js"






const get_user = async (req, res)=>{
    const userID = req.params.id
    const get_userVar = await users_model.find({_id:userID})
    res.json(get_userVar)
}











const get_users = async (req, res)=>{
    const {username, password} = req.body
    const users = await users_model.find({
        username:username,
        password:password
    })
    if(users == ""){
        res.json({
            'users':users,
            'code':401,
            'message':'incorrect username or password!'
        })
    }
    else{
        res.json({
            'code':200,
            'message':users
        })
    }
}



const post_users = async (req, res)=>{
    const {username, password} = req.body
    const check_username = await users_model.findOne({'username':username})
    if(check_username != null){
        res.json("username already exists")
    }
    else{
        const users = await users_model.create({
            'username':username,
            'password':password
        })
        if(users){
            res.json({
                status : 200
            })
        }
        else{
            res.json({
                status : 400
            })
        }
    }
}



const get_users1 = async (req, res)=>{
    const get_userVar = await users_model.find()
    res.json(get_userVar)
}



const update_user = async (req, res)=>{
    const{username, password} = req.body
    await users_model.updateOne(
        {
            '_id':req.params.id
        },
        {'username':username, 'password':password},
        res.json('succesfully updated')
    )
}



const delete_users = async (req, res)=>{
    const id = req.params.id
    if(!await users_model.findOne({'_id':id})){
        res.json("cannot find user")
    }
    else{
        const delete_user = await users_model.deleteOne({'_id':id})
        res.json("user deleted succesfully")
    }
}


const get_users_search = async(req,res)=>{
    const {searchValue} = req.params
    const get_users_search_var = await users_model.find({
        username : {$regex:searchValue}
    })
    res.json(get_users_search_var)
}





export {get_users, get_user, post_users, update_user, delete_users, get_users1, get_users_search}