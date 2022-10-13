import '../assets/css/searchRoom.css'
import LeftPanelUserCard from './leftPanelUserCard.js'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router';

const SearchRoom = ({searchValue})=>{

    const userID = useParams().id
    const [partnerChats, setPartnerChats] = useState([])
    const [partners, setPartners] = useState([])
    let searchUsers = []
    let partners2 = []
    let partnerChats2 = []
    let partnerName
    let partnerID

    //search people
    const getChat = async ()=>{
        if (searchValue.length !== 0){
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
                            setPartners([...searchUsers])
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
                            setPartners([...searchUsers])
                        }
                    }
                    getUserChat()
                })
    
            }
        }
    }
    useEffect(()=>{
        if(searchValue){
            getChat()
        }
    },[searchValue])

    return(
        <>
            <div className="chatTitle">People</div>
            {
                partners.map(partnersMap =>{
                    return(
                        <>
                            <LeftPanelUserCard partnersMap = { partnersMap }/>
                        </>
                    )
                })
            }
            <div className="chatTitle">Chats</div>
            <LeftPanelUserCard />
        </>
    )
}

export default SearchRoom