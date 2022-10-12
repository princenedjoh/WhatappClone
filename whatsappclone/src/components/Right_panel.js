import '../assets/css/right_panel.css'
import axios from 'axios'
import { useParams } from 'react-router';
import React, { useState, useEffect } from 'react'
import ChatRoom from './Chat_room.js'
import {FaUserCircle} from "react-icons/fa"
import {BiVideo} from "react-icons/bi"
import {IoCallOutline} from "react-icons/io5"
import {VscSearch} from "react-icons/vsc"
import {BsThreeDots} from "react-icons/bs"
import {GrEmoji} from "react-icons/gr"
import {GrAttachment} from "react-icons/gr"
import {BsMic} from "react-icons/bs"
import {IoSendOutline} from "react-icons/io5"









let userID
let get_chat




function RightPanel(){
    userID = useParams().id
    const [partnerID, setPartnerID] = useState()
    const [message_box, set_message_box] = useState([])
    const [partnerName, setPartnerName] = useState()


    get_chat = async (partnerID2)=>{
        setPartnerID(partnerID2)
        console.log(partnerID2)
        //get partner name
        const getPartnerName = await axios.get(`http://localhost:3001/user/${partnerID2}`)
        console.log(partnerID2)
        console.log(getPartnerName.data)
        setPartnerName(getPartnerName.data[0].username)
        //get chat between both users
        console.log(userID)
        const demo = await axios.get(`http://localhost:3001/chat/${userID}/${partnerID2}`)
        console.log(`${userID}, ${partnerID2}`)
        set_message_box(demo.data)
        console.log(demo.data)
    }
    

    const [message_box2, set_message_box2] = useState("")
    const set_message_box2_func = (message_input2)=> {
        set_message_box2(message_input2)
    }

    const sender = userID
    const receiver = partnerID


    //sending a message
    const send_message = (e) =>{
        e.preventDefault()
        if(!message_box2 == ""){
        const newdate = new Date()
        const day = newdate.getDay()
        const date = newdate.getDate()
        const month = newdate.getMonth()
        const year = newdate.getFullYear()
        const hour = newdate.getHours()
        const minute = newdate.getMinutes()
        const second = newdate.getSeconds()
        
        const message_box1 =     
        {
            'sender':sender,
            'receiver':receiver,
            'time':'12:00',
            'day':day,
            'date':date,
            'month':month,
            'year':year,
            'hour':hour,
            'minute':minute,
            'second':second
        }
        message_box1.message = message_box2


        const post_chat_axios = async ()=>{
            try{
            
                const post_chat = await axios.post('http://localhost:3001/chat',
                    {
                        sender:sender,
                        receiver:receiver,
                        message:message_box2,
                        day:day,
                        date:date,
                        month:month,
                        year:year,
                        hour:hour,
                        minute:minute,
                        second:second
                    }
                )
                console.log(post_chat)
            }
            catch(err) { console.log(err.response)}
    
        }
        post_chat_axios()




        message_box.push(message_box1)
        set_message_box2('')
        e.preventDefault()
        }
    }




    return(
        <>
            <div className="right_panel1">
                <div className="nav">
                    <div className="left_nav">
                        <div className="profile_picture">
                        < FaUserCircle fontSize="50px" />
                        </div>
                        <div className="name">
                            {partnerName}
                        </div>
                    </div>

                    <div className="right_nav">
                        <div className="video_call_button">
                            < BiVideo fontSize="21px" />
                        </div>

                        <div className="phone_call_button">
                            < IoCallOutline fontSize="21px" />
                        </div>

                        <div className="bar_seperator">
                            
                        </div>

                        <div className="right_panel_search_button">
                            < VscSearch fontSize="21px" />
                        </div>

                        <div className="menu_button">
                            < BsThreeDots fontSize="21px" />
                        </div>
                    </div>
                </div>




                <div className="chat_room">
                    < ChatRoom message_box = {message_box}/>
                </div>




                <div className="message_section">


                    <div className="react_attach">
                        <div className="emojis">
                            < GrEmoji fontSize="25px" />
                        </div>
                        <div className="attchment">
                            < GrAttachment fontSize="22px" />
                        </div>
                    </div>
                    <form className="message_from" onSubmit={e =>send_message(e)}>
                        <div className="message_box">
                            <input type="text" value = {message_box2} onChange={e => set_message_box2_func(e.target.value)} placeholder="Type a message" value={message_box2} />
                            <button type="submit" className="send_message_button"> < IoSendOutline fontSize="18px"/> </button>
                        </div>
                        <div className="microphone" >
                            < BsMic fontSize="22px" />
                        </div>
                    </form>

                </div>
            </div>
        
        
        
        </>
    )
}


export default RightPanel
export { get_chat }