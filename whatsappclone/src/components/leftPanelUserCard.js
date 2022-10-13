import '../assets/css/leftPanelUserCard.css'

const LeftPanelUserCard = ({ partnersMap })=>{
    return(
        <>
            <div className="sCardchat_section" >
                <div className="sCardprivate_chat_profile_picture">

                </div>


                <div className="sCardright_private_chat">
                    <div className="sCardprivate_chat_mid">
                        <div className="sCardprivate_chat_name">
                            {partnersMap? partnersMap.partnerName : null}
                        </div>
                        <div className="sCardprivate_chat_message_preview">
                            {partnersMap? partnersMap.message : null}
                        </div>
                    </div>

                    <div className="sCardprivate_chat_info">
                        <div className="sCardprivate_chat_time">
                            {partnersMap? partnersMap.hour : null}:{partnersMap? partnersMap.minute : null}
                        </div>
                        <div className="sCardnumber_of_messages">
                        {partnersMap? partnersMap.messageNumber : null}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LeftPanelUserCard