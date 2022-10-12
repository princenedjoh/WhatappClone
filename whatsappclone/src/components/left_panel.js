import axios from 'axios'
import {useEffect, useState} from 'react'
import { useParams } from 'react-router';
import { get_chat } from './Right_panel.js'
import '../assets/css/left_panel.css'
import {GoSearch} from "react-icons/go"
import {FaUserCircle} from "react-icons/fa"
import {BsGlobe} from "react-icons/bs"
import {AiOutlinePlus} from "react-icons/ai"
import {BsThreeDots} from "react-icons/bs"




// edemnedjoh   62f42416ee8a19537166176d
// princenedjoh 62f423e4ee8a195371661765
// kweku   62f2b2ae1952aaed5d0b7443








let loaded = false
let partnerID

function LeftPanel(props){



    const userID = useParams().id
    const [partnerChats, setPartnerChats] = useState([])
    let partnerChats2 = []
    let partnerName
    let searchValue



    //search functionality
    const searchFunctionality = async (e) =>{
        searchValue = e.target.value
        if (searchValue.length !== 0){
            let searchUsers = []
            const getSearchValue = await axios.get(`http://localhost:3001/users/search/${searchValue}`)
            const getSearchValueFilter = getSearchValue.data.filter(getSearchValueFilter2 => 
                    getSearchValueFilter2._id !== userID
                )
            console.log(getSearchValueFilter)
            if(getSearchValueFilter.length !== 0){
                getSearchValueFilter.map(getSearchValueFilterMap =>{
                    partnerID = getSearchValueFilterMap._id
                    console.log(partnerID)
                    let partnerName = getSearchValueFilterMap.username
                    const getUserChat = async()=>{
                        const getUserChatVar =  await axios.get(`http://localhost:3001/chat/${partnerID}`)
                        if(getUserChatVar.data.length !== 0){                     
                            const getUserChatVarData = getUserChatVar.data
                            let newChat = {
                                partnerID:partnerID,
                                partnerName:partnerName,
                                messageNumber:getUserChatVarData.length,
                                sender:getUserChatVarData[0].sender,
                                receiver:getUserChatVarData[0].receiver,
                                message:getUserChatVarData[0].message,
                                month:getUserChatVarData[0].month,
                                year:getUserChatVarData[0].year,
                                hour:getUserChatVarData[0].hour,
                                minute:getUserChatVarData[0].minute,
                                delivered:true,
                                seen:false
                            }
                            searchUsers.push(newChat)
                            console.log(searchUsers)
                            setPartnerChats([...searchUsers])
                        }
                        else{
                            let newChat = {
                                partnerID:partnerID,
                                partnerName:partnerName,
                                messageNumber:"",
                                sender:"",
                                receiver:"",
                                message:"",
                                month:"",
                                year:"",
                                hour:"",
                                minute:"",
                                delivered:true,
                                seen:false
                            }
                            console.log(partnerID)
                            searchUsers.push(newChat)
                            console.log(searchUsers)
                            setPartnerChats([...searchUsers])
                        }
                    }
                    getUserChat()
                })
    
            }
        }
        else{
            chats()
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
                        <div className="search_button">
                            <GoSearch/>
                        </div>
                        <div className="back_navigation_button">

                        </div>
                        <div className="search_input">
                            <input type="text" placeholder="Search or start new chat"
                                onChange={e =>searchFunctionality(e)}
                                ></input>
                        </div>
                        <div className="cancel_button">
                            
                        </div>
                    </div>
                </div>



                <div className="private_chats">
                    {partnerChats.map(partnerChatsMap=>{
                        return(
                            <div className="chat_section" key={partnerChats.indexOf(partnerChatsMap)}
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