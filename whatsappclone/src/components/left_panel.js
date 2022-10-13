import axios from 'axios'
import SearchRoom from './searchRoom.js'
import {useEffect, useState, useRef} from 'react'
import { useParams } from 'react-router';
import { get_chat } from './Right_panel.js'
import '../assets/css/left_panel.css'
import {GoSearch} from "react-icons/go"
import {FaUserCircle} from "react-icons/fa"
import {BsGlobe} from "react-icons/bs"
import {AiOutlinePlus} from "react-icons/ai"
import {BsThreeDots} from "react-icons/bs"
import { IoArrowBackOutline } from 'react-icons/io5'
import { MdOutlineCancel } from 'react-icons/md'




// edemnedjoh   62f42416ee8a19537166176d
// princenedjoh 62f423e4ee8a195371661765
// kweku   62f2b2ae1952aaed5d0b7443








let loaded = false
let partnerID

function LeftPanel(props){

    //refs
    const searchRoom = useRef(null)
    const chat_section = useRef(null)
    const search_button = useRef(null)
    const back_navigation_button = useRef(null)
    const cancel_button = useRef(null)

    const userID = useParams().id
    const [partnerChats, setPartnerChats] = useState([])
    const [searchValue, setSearchValue] = useState([])
    let partnerChats2 = []
    let partnerName



    //search functionality
    const searchFunctionality = async (e) =>{
        if(e.target.value.length !== 0){
            search_button.current.style.display = 'none'
            back_navigation_button.current.style.display = 'block'
            cancel_button.current.style.display = 'block'
            if(chat_section.current.style.display !== 'none'){
                chat_section.current.style.display = 'none'
            }
            if(searchRoom.current.style.display !== 'block'){
                searchRoom.current.style.display = 'block'
            }
            setSearchValue(e.target.value)
        }
        else{
            search_button.current.style.display = 'block'
            back_navigation_button.current.style.display = 'none'
            cancel_button.current.style.display = 'none'
            console.log(searchRoom.current.style.display = 'none')
            console.log(chat_section.current.style.display = 'flex')
        }
    }

    //partner messge on the left pannel has been clicked
    const partnerMessageClick = (partnerID1) =>{
        get_chat(partnerID1)
    }

    //get left panel cards
    const chats = async ()=>{
        const chatsVar = await axios.get(`http://localhost:3001/chat/${userID}`)





        for(const chatsVarMap of chatsVar.data){
                
            //if receiver is not the userID then receiver is the partnerID        
            if(chatsVarMap.receiver !== userID){
                partnerID = chatsVarMap.receiver 
            }
            else{
                partnerID = chatsVarMap.sender
            }
            
            
            const getPartnerNameVar = await axios.get(`http://localhost:3001/user/${partnerID}`)
            partnerName = getPartnerNameVar.data[0].username

            

            
            


            let newChat = {
                partnerID:partnerID,
                partnerName:partnerName,
                messageNumber:1,
                sender:chatsVarMap.sender,
                receiver:chatsVarMap.receiver,
                message:chatsVarMap.message,
                month:chatsVarMap.month,
                year:chatsVarMap.year,
                hour:chatsVarMap.hour,
                minute:chatsVarMap.minute,
                delivered:true,
                seen:false
            }




             //algo add message or increase message number
             //check if partnerChats is null
                if(partnerChats2.length === 0){
                    partnerChats2.push(newChat)
                }

                //find who the partner is
                else{


                    //find partner chats which contain partner id
                    const partnerChatsPartnerIDFind1 = partnerChats2.find(partnerChatsFind =>{ return partnerChatsFind.sender === partnerID})
                    const partnerChatsPartnerIDFind2= partnerChats2.find(partnerChatsFind =>{ return partnerChatsFind.receiver === partnerID})



                    //if the partner chat is not in the partnerChats array then add it
                    if(partnerChatsPartnerIDFind1 === undefined && partnerChatsPartnerIDFind2 === undefined){
                        partnerChats2.push(newChat)
                    }
                    else{
                        for(let partnerChats2For of partnerChats2){
                            if(partnerChats2For.sender === partnerID || partnerChats2For.receiver === partnerID){
                                partnerChats2For.messageNumber = partnerChats2For.messageNumber + 1
                                partnerChats2For.message = chatsVarMap.message
                                partnerChats2For.hour = chatsVarMap.hour
                                partnerChats2For.minute = chatsVarMap.minute
                            }
                        }
                        // partnerChats2.find(partnerChatsFind =>{ partnerChatsFind.messageNumber = partnerChatsFind.messageNumber + 1})
                    }



                }
                
                setPartnerChats(()=>[ ...partnerChats2 ])
        
        }
    }

    useEffect(()=>{
        if(loaded){
            chats()
        }
        else{
            loaded = true
        }
    },[])
    









    
    

    

    return(
        <>

            <div className="main">
                <div className="user_profile">
                    <div className="user_profile_picture">
                        < FaUserCircle fontSize="50px" />
                    </div>
                    <div className="user_profile_elements">
                        <div className="status_icon">
                            < BsGlobe fontSize="21px"/>
                        </div>
                        
                        <div className="add_icon">
                            < AiOutlinePlus fontSize="21px"/>
                        </div>

                        <div className="menu_icon">
                            < BsThreeDots fontSize="21px"/>
                        </div>
                    </div>
                </div>



                <div className="search_bar_div">
                    <div className="search_bar">
                        <div className="search_button" ref={search_button}>
                            <GoSearch  color="grey"/>
                        </div>
                        <div className="back_navigation_button" ref={back_navigation_button}>
                            <IoArrowBackOutline  color="grey"/>
                        </div>
                        <div className="search_input">
                            <input type="text" placeholder="Search or start new chat"
                                onChange={e =>searchFunctionality(e)}
                                ></input>
                        </div>
                        <div className="cancel_button" ref={cancel_button}>
                            < MdOutlineCancel color="grey"/>
                        </div>
                    </div>
                </div>



                <div className="private_chats">
                    <div className="searchRoom" ref={searchRoom}>
                        < SearchRoom searchValue={searchValue}/>
                    </div>
                    {partnerChats.map(partnerChatsMap=>{
                        return(
                            <div className="chat_section" ref={chat_section} key={partnerChats.indexOf(partnerChatsMap)}
                                onClick={()=>partnerMessageClick(partnerChatsMap.partnerID)}>
                                <div className="private_chat_profile_picture">
        
                                </div>
        
        
                                <div className="right_private_chat">
                                    <div className="private_chat_mid">
                                        <div className="private_chat_name">
                                            {partnerChatsMap.partnerName}
                                        </div>
                                        <div className="private_chat_message_preview">
                                            {partnerChatsMap.message}
                                        </div>
                                    </div>
        
                                    <div className="private_chat_info">
                                        <div className="private_chat_time">
                                            {partnerChatsMap.hour}:{partnerChatsMap.minute}
                                        </div>
                                        <div className="number_of_messages">
                                            {partnerChatsMap.messageNumber}
                                        </div>
                                    </div>
                                </div>
                            </div>

                        )
                    })}

                                
    


                
                </div>
            </div>
        </>
    )
}


export default LeftPanel