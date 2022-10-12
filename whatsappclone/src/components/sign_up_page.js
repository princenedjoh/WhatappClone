import '../assets/css/sign_up_page.css'
import axios from 'axios'
import {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import {AiOutlineUser} from "react-icons/ai"
import {RiLockPasswordLine} from "react-icons/ri"




const SignUpPage = ()=>{


    const [sign_up_username, set_sign_up_username] = useState("")
    const [sign_up_password, set_sign_up_password] = useState("")
    const navigate = useNavigate()


    const sign_up_submit = async (e)=>{
        e.preventDefault()
        const createUser = await axios.post('http://localhost:3001/users',
        {
            username:sign_up_username,
            password:sign_up_password
        })
        if(createUser.data.status === 200){
            navigate('/signin')
        }
    }






    return(
        <>
            <div className="signup_div">
                <form className="signup" onSubmit={(e)=>sign_up_submit(e)}>
                    <div className="signup_title">
                        Sign Up
                    </div>
                    <div className="signup_username">
                        <div className="loginIconProfile">
                            <AiOutlineUser/>
                        </div>
                        <div className="signup_usernameDivider">

                        </div>
                        <input type="text" placeholder="Username" onChange={(e)=>set_sign_up_username(e.target.value)}/>
                    </div>
                    <div className="signup_password">
                        <div className="loginIconProfile">
                                <RiLockPasswordLine/>
                        </div>
                        <div className="signup_usernameDivider">
                                
                        </div>                        
                        <input type="password" placeholder="password" onChange={(e)=>set_sign_up_password(e.target.value)}/>
                    </div>
 
                    <button className="signup_button">Sign up</button>
                    <div className="signup_signin_div">
                        <a href="/signin" className="signup_signin" >
                            Sign in
                        </a>
                    </div>
                </form>
            </div>
        </>
    )
}




export default SignUpPage