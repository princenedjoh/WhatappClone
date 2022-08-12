import '../assets/css/sign_in_page.css'
import {useState} from 'react'
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import {AiOutlineUser} from "react-icons/ai"
import {BsKeyFill} from "react-icons/bs"




export let user_id = ""
const SignInPage = ()=>{
    let navigate = useNavigate()
    let user_user_id = ""
    const [signin_error_message, set_signin_error_message] = useState("")
    const [sign_in_username, set_sign_in_username] = useState("")
    const [sign_in_password, set_sign_in_password] = useState("")


    const sign_in_submit = async (e)=>{
        e.preventDefault()
        const user = await axios.post('http://localhost:3001/signin',
        {
            username:sign_in_username,
            password:sign_in_password
        })
        console.log(user.data)
        if(user.data.code == 401){
            console.log(user.data.message)
            set_signin_error_message(user.data.message)
            e.preventDefault()
        }
        else{
            user_user_id = user.data.message[0]._id
            console.log(user_user_id)
            navigate(`/chat/${user_user_id}`)
        }
        // e.preventDefault()
    }
    

 




    return(
        <>
            <div className="signin_div">
                <form className="signin" onSubmit={(e)=>sign_in_submit(e)}>
                    <div className="signin_title">
                        Sign in
                    </div>
                    <div className="signin_username">
                        <div className="loginIconProfile">
                            <AiOutlineUser/>
                        </div>
                        <div className="signin_usernameDivider">

                        </div>
                        <input type="text" placeholder="Username" onChange={(e)=>set_sign_in_username(e.target.value)}/>
                    </div>
                    <div className="signin_password">
                        <div className="loginIconProfile">
                                <BsKeyFill/>
                        </div>
                        <div className="signin_usernameDivider">
                                
                        </div>                        
                        <input type="password" placeholder="password" onChange={(e)=>set_sign_in_password(e.target.value)}/>
                    </div>

                    <button className="signin_button">Sign in</button>
                    <div className="signin_error_message">{signin_error_message}</div>
                    <div className="signin_signup_div">
                        <a href="/signup" className="signin_signup" >
                            Sign Up
                        </a>
                    </div>
                </form>
            </div>
        </>
    )
}




export default SignInPage