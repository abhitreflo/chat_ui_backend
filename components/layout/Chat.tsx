import styles from './Chat.module.css';
import SendImg from '../images/send.png';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import ChatTextPub from './ChatTextPub'
//import ChatTextSub from './ChatTextSub'
import ChatUpdate from './ChatUpdate'

interface chat_channel_props{
    channel: string;
}

function ChatSide({channel}:chat_channel_props) {
    const inputRef = useRef<any>();
    const [chat_text,set_chat_text]=useState("")
    const [messageObject,setMessageObject]=useState<any>()
     
    useEffect(() =>{

        var subchannel = Backendless.Messaging.subscribe( "mihir1" );

        function onMessage( pubsubmessage:object ) {
        console.log( "Message received: " , pubsubmessage )
        setMessageObject(pubsubmessage)
        }
    
        subchannel.addMessageListener( onMessage );
 },) 
/*  useEffect(()=>{
    console.log("chat_saving_Message",messageObject)

    ChatUpdate( {
        message: messageObject?.message,
        message_sender: messageObject?.headers.sender,
        message_timestamp: messageObject?.timestamp,
        message_receiver: messageObject?.headers.receiver,
        message_channel: messageObject?.headers.channel,})
 },[messageObject]) */
        
   
useEffect(()=>{
    if(messageObject)
    {
        chat_update()
    }
    
},[messageObject])




    const submitHandler = (e:any) => {
        console.log(chat_text,'submitted')
        e.preventDefault();
        ChatTextPub({channel:channel,message:chat_text,pubOpsProps:{sender:'Abhi',receiver:'Mihir',channel:channel}})

        var subchannel = Backendless.Messaging.subscribe( "mihir1" );

        /* function onMessage( pubsubmessage:object ) {
        console.log( "Message received: " , pubsubmessage )
        setMessageObject(pubsubmessage)
        }
    
        subchannel.addMessageListener( onMessage );
 */
        

        
        
        set_chat_text("")
    };


    function chat_update(){
        console.log("chat_saving_Message",messageObject)

        ChatUpdate( {
        message: messageObject?.message,
        message_sender: messageObject?.headers.sender,
        message_timestamp: messageObject?.timestamp,
        message_receiver: messageObject?.headers.receiver,
        message_channel: messageObject?.headers.channel,})
    }

    const clickHandler = () => {
        if(inputRef?.current?.value!='')
        {
            console.log(inputRef?.current?.value );

        }
    };

    return (
        <div className={styles.chat_container}>
            <div className={styles.chat_heading}>Chat will appear here</div>
            <div className={styles.chat_body}>Chat text</div>
            <form className={styles.chat_typing} onSubmit={submitHandler}>
                <input
                    ref={inputRef}
                    autoComplete="off"
                    className={styles.type_input}
                    type="text"
                    placeholder="Type Here..."
                    value={chat_text}
                    id="chat_text"
                    onChange={(e)=>{
                        let temp_chat_text = e.target.value
                        //console.log(temp_chat_text)
                        set_chat_text(temp_chat_text)
                    }}
                />
                <button onClick={clickHandler} type="submit" className={styles.send_btn}>
                    <Image
                        src={SendImg}
                        className={styles.image}
                        alt="send Image"
                        width="40"
                        height="40"
                    />
                </button>
            </form>
        </div>
    );
}

export default ChatSide;
