import '../assets/css/chat_room.css'
import { useParams } from 'react-router';


var client_chatbox_div = ""
var client_chatbox = ""
let key2 = 0










function ChatRoom(props){

    const user_id = useParams().id




    
 
    return(
        <>
            <div className="chat_room1">
                {props.message_box.map(chat=>{
                    if(chat.sender == user_id){
                        client_chatbox_div = 'client_chatbox_div_end'
                        client_chatbox = 'client_chatbox_sender'
                    }
                    else{
                        client_chatbox_div = 'client_chatbox_div_start'
                        client_chatbox = 'client_chatbox_receiver'
                    }
                    return(
                    <div key={props.message_box.indexOf(chat)} className={client_chatbox_div}>
                        <div className={client_chatbox}>
                            <div className="chatbox_message"> {chat.message}<pre>     </pre></div>
                            <div className="chatbox_time">{chat.hour + ":" + chat.minute}</div>
                        </div>
                    </div>
                    )
                })}
            </div>
        </>
    )
}


export default ChatRoom