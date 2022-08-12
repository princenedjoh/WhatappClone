import axios from 'axios'
import {useEffect, useState} from 'react'
import { useParams } from 'react-router';
import '../assets/css/left_panel.css'
import {GoSearch} from "react-icons/go"
import {FaUserCircle} from "react-icons/fa"
import {BsGlobe} from "react-icons/bs"
import {AiOutlinePlus} from "react-icons/ai"
import {BsThreeDots} from "react-icons/bs"




// edem   62cb1d63b3099a464554d1ba
// princenedjoh 62d0941ad89b04328780c1bc
// kweku   62f2b2ae1952aaed5d0b7443










function LeftPanel(props){



    const userID = useParams().id
    const [partnerChats, setPartnerChats] = useState([])
    
 
 


    //Sir ken's code

    // const getUserChats = async ()=>{
    //     const chats = await axios.get(`http://localhost:3001/chat/${userID}`)
    //     const filteredChats = chats.data.filter((chat)=> chat.receiver != userID)
    //     console.log(filteredChats)
    //     const sortedDesc = filteredChats.sort(
    //         (objA, objB) => {
    //             Number(objB.date) - Number(objA.date)
    //             const 
    //         },
    //       );
    // }












    //my code

    // const chats = async ()=>{
    //     let partnerChats2 = []

    //     let partnerName = ''
    //     let partnerID = ''
    //     const chatsVar = await axios.get(`http://localhost:3001/chat/${userID}`)



    //     // chatsVar.data.map(chatsVarMap =>{
            
    //     //     const chartsVar2 = async ()=>{
                
    //     //         //if receiver is not the userID then sender is the partnerID        
    //     //         if(chatsVarMap.receiver !== userID){
    //     //             partnerID = chatsVarMap.receiver 
    //     //         }
    //     //         else{
    //     //             partnerID = chatsVarMap.sender
    //     //         }
                

    //     //         const getPartnerNameVar = await axios.get(`http://localhost:3001/user/${partnerID}`)
    //     //         partnerName = getPartnerNameVar.data[0].username

                

                
                


    //     //         let newChat = {
    //     //             partnerID:partnerID,
    //     //             partnerName:partnerName,
    //     //             sender:chatsVarMap.sender,
    //     //             receiver:chatsVarMap.receiver,
    //     //             message:chatsVarMap.message,
    //     //             month:chatsVarMap.month,
    //     //             year:chatsVarMap.year,
    //     //             hour:chatsVarMap.hour,
    //     //             minute:chatsVarMap.minute,
    //     //             delivered:true,
    //     //             seen:false
    //     //         }





    //     //         //check if partnerChats is null
    //     //         if(partnerChats2.length === 0){
    //     //             console.log(partnerChats2.length)
    //     //             partnerChats2.push(newChat)
    //     //         }

    //     //         //find who the partner is
    //     //         else{


    //     //             console.log(partnerChats2.length)
    //     //             //find partner chats which contain partner id
    //     //             const partnerChatsPartnerIDFind1 = partnerChats2.find(partnerChatsFind =>{ return partnerChatsFind.sender === partnerID})
    //     //             const partnerChatsPartnerIDFind2= partnerChats2.find(partnerChatsFind =>{ return partnerChatsFind.receiver === partnerID})



    //     //             //if the partner chat is not in the partnerChats array then add it
    //     //             if(partnerChatsPartnerIDFind1 === undefined && partnerChatsPartnerIDFind2 === undefined){
    //     //                 // setPartnerChats([...partnerChats,newChat])
    //     //                 partnerChats2.push(newChat)
    //     //                 console.log(partnerChats2)
    //     //             }



    //     //         }
                
    //     //         setPartnerChats(()=>partnerChats2)
                
                


    //     //     }
    //     //     chartsVar2()

    //     // // setPartnerChats(()=>partnerChats2)
        
        
    //     // })
    // }

    // useEffect(()=>{
    //     getUserChats()
    // },[])

 






    
    

    

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
                            <input type="text" placeholder="Search or start new chat"></input>
                        </div>
                        <div className="cancel_button">
                            
                        </div>
                    </div>
                </div>



                <div className="private_chats">
                    {partnerChats.map(partnerChatsMap=>{
                        return(
                            <div className="chat_section" key={partnerChats.indexOf(partnerChatsMap)}>
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
                                        200
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