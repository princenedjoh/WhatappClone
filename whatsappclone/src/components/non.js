    const get_chat_axios = async ()=>{
        // try{
            const get_chat = await axios.get(`http://localhost:3001/chat/${user_id}`)
            console.log(get_chat.data)
            





            get_chat.data.map(get_chat_map=>{

                
                let partnerID = ''
                if(get_chat_map.sender == user_id){
                    partnerID = get_chat_map.receiver
                }
                else{
                    partnerID = get_chat_map.sender
                }


                const senderIDsObgect = senderIDs.find(senderIDsFind=>{ return senderIDsFind.partnerID == get_chat_map.receiver})
                console.log(senderIDsObgect)
                if(senderIDsObgect != undefined){console.log(senderIDsObgect)}
                

                //adding first sender ID since first one is always undefined
                if(senderIDsObgect == undefined){
                    const partnerUsername = async ()=>{
                        const partnerUsernameVar = await axios.get(`http://localhost:3001/user/${partnerID}`)
                        let recentMessage = {
                            partnerID: partnerID,
                            partnerUsername: partnerUsernameVar.data[0].username,
                            message: get_chat_map.message,
                            seen:get_chat_map.seen,
                            numberUnread:0,
                            month:get_chat_map.month,
                            year:get_chat_map.year,
                            hour:get_chat_map.hour,
                            minute:get_chat_map.minute,
                        }
                        if(recentMessage.seen == false){
                            recentMessage.numberUnread = recentMessage.numberUnread + 1
                        }
                        setSenderIDs(()=>([recentMessage]))
                        console.log(senderIDs)

                        
                        
                    }
                    partnerUsername()


                }
                



                else if(partnerID != senderIDsObgect.partnerID){

                    
                    const partnerUsername = async ()=>{
                        const partnerUsernameVar = await axios.get(`http://localhost:3001/user/${partnerID}`)
                        let recentMessage = {
                            partnerID: partnerID,
                            partnerUsername: partnerUsernameVar.data[0].username,
                            message: get_chat_map.message,
                            seen:get_chat_map.seen,
                            numberUnread:0,
                            month:get_chat_map.month,
                            year:get_chat_map.year,
                            hour:get_chat_map.hour,
                            minute:get_chat_map.minute,
                        }
                        if(recentMessage.seen == false){
                            recentMessage.numberUnread = recentMessage.numberUnread + 1
                        }
                        setSenderIDs([...senderIDs,recentMessage])
                        console.log('adding new')
                    }
                    partnerUsername()
                }



                else{
                    if(get_chat_map.seen == false){
                        senderIDs.map(senderIDsMap =>{
                            if(senderIDsMap.partnerID == partnerID){
                                senderIDsMap.numberUnread = senderIDsMap.numberUnread + 1
                            }
                        })
                    }
                    console.log('else')



                }
            })




        // }
        // catch(err) { console.log(err.response)}

    
    }
