import styles from "./Chat.module.css";
import SendImg from "../images/send.png";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import ChatTextPub from "./ChatTextPub";
//import ChatTextSub from './ChatTextSub'
import ChatUpdate from "./ChatUpdate";
//import GetChat from './GetChat'
import ChatText from "./ChatText";
import stylestext from "./ChatText.module.css";
import { Button } from "@mui/material";

interface chat_channel_props {
  channel: string,
  username:string,
}

function ChatSide({ channel,username }: chat_channel_props) {
  const inputRef = useRef<any>();
  const [chat_text, set_chat_text] = useState("");
  const [messageObject, setMessageObject] = useState<any>();
  const [sub, setSub] = useState(true);
  const [messageId, setMessageId] = useState("");
  const [result, setResult] = useState<any>([]);

  function chat_update() {
    //console.log("sub_6", sub);

    //console.log("chat_saving_Message", messageObject);

    ChatUpdate({
      message: messageObject?.message,
      message_sender: messageObject?.headers.sender,
      message_timestamp: messageObject?.timestamp,
      message_receiver: messageObject?.headers.receiver,
      message_channel: messageObject?.headers.channel,
    });
  }
  useEffect(() => {
    //console.log("sub_5", sub);

    setTimeout(() => {
      //console.log('GetChat')
      Backendless.Data.of(channel)
        .find()
        .then(function (result) {
          result.sort(function (x: any, y: any) {
            return x?.message_timestamp - y?.message_timestamp;
          });
          //console.log("result", result);
          //resultmessages = result
          setResult(result);
          return result;
        })
        .catch(function (error) {
          console.log("error in get chat", error);
          return false;
        });
    }, 300);
  }, []);

  useEffect(() => {
    //console.log("sub_4", sub);

    if (sub) {
      setSub(false);
      var subchannel = Backendless.Messaging.subscribe(channel);
      /* onMessage( ) */

      subchannel.addMessageListener(onMessage);
    }
    function onMessage(pubsubmessage: object) {
      //console.log( "Message received: in onmesssage " , pubsubmessage )
      setMessageObject(pubsubmessage);
      setSub(false);
    }

    //GetChat()
  }, []);

  /*  useEffect(()=>{
    console.log("chat_saving_Message",messageObject)

    ChatUpdate( {
        message: messageObject?.message,
        message_sender: messageObject?.headers.sender,
        message_timestamp: messageObject?.timestamp,
        message_receiver: messageObject?.headers.receiver,
        message_channel: messageObject?.headers.channel,})
 },[messageObject]) */

  /* function GetChat(){
    console.log('GetChat')
    Backendless.Data.of( "mihir1" ).find()
    .then( function( result ) {
        console.log( 'result',result)
        //resultmessages = result
        //setResultMessages(result)
        return result
     })
    .catch( function( error ) {
        console.log("error in get chat",error)
        return false
     });
} */
  useEffect(() => {
    //console.log("sub_3", sub);

    if (messageObject && messageId != messageObject.messageId) {
      //console.log("run ");
      setTimeout(chat_update, 300);
      setSub(true);
      setMessageId(messageObject.messageId);

      setTimeout(() => {
        //console.log("GetChat");
        Backendless.Data.of(channel)
          .find()
          .then(function (result) {
            /* result.sort(function(x,y){
                    if(parseInt(x.message_timestamp)>parseInt(y.message_timestam))
                    {return -1}
                    else if(parseInt(x.message_timestamp)<parseInt(y.message_timestamp))
                    {return 1}
                    else
                    {return 0}
                }) */
            result.sort(function (x: any, y: any) {
              return x?.message_timestamp - y?.message_timestamp;
            });
            //console.log("result_wanted", result);

            //resultmessages = result
            setResult(result);
            return result;
          })
          .catch(function (error) {
            //console.log("error in get chat", error);
            return false;
          });
      }, 300);
      //setTimeout( ()=>{setResult(GetChat())},300)
    }
  }, [messageObject]);

  /* setTimeout( ()=>{
    chat_update()
},1000) */

  useEffect(() => {
    //console.log("sub_1", sub);

    if (sub) {
      setSub(false);
      var subchannel = Backendless.Messaging.subscribe(channel);
      /* onMessage( ) */

      subchannel.addMessageListener(onMessage);
    }
    function onMessage(pubsubmessage: object) {
      //console.log( "Message received: in onmesssage " , pubsubmessage )
      setMessageObject(pubsubmessage);
      setSub(false);
    }

    //GetChat()

    {
      //console.log('GetChat')
      Backendless.Data.of(channel)
        .find()
        .then(function (result) {
          result.sort(function (x: any, y: any) {
            return x?.message_timestamp - y?.message_timestamp;
          });
          //console.log("result", result);
          //resultmessages = result
          setResult(result);
          return result;
        })
        .catch(function (error) {
          console.log("error in get chat", error);
          return false;
        });
    }
  }, [channel]);

  const submitHandler = (e: any) => {
    console.log(chat_text, "submitted");
    e.preventDefault();
    if(chat_text===''){
        console.log('Empty message cannot be sent!:(')
        console.log('returning...')
        return
    }
    ChatTextPub({

      channel: channel,
      message: chat_text,
      pubOpsProps: { sender: username,  channel: channel },
    });

    var subchannel = Backendless.Messaging.subscribe(channel);

    function onMessage(pubsubmessage: object) {
      //console.log("Message received: ", pubsubmessage);
      setMessageObject(pubsubmessage);
    }

    subchannel.addMessageListener(onMessage);
    //console.log("sub_2", sub);

    setTimeout(() => {
      set_chat_text("");
    }, 250);
  };

  /* {console.log("fullresult")} */

  const clickHandler = () => {
    if (inputRef?.current?.value != "") {
      //console.log(inputRef?.current?.value);
    }
  };

  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    scrollToBottom();
  }, [result]);
  return (
    <div className={styles.chat_container}>
      <div className={styles.chat_heading}>
        <div>{channel} : </div>
        <div className={styles.chat_body_chat_instructions}>
          {" "}
          Chat will appear below
        </div>
      </div>

      <div className={styles.chat_body}>
        {/* Hello */}
        {/* {result.map((item:any)=>
                (
                <div className={stylestext.message_body} key={item?.created}>
                    <div className={stylestext.column}>
                        <div className={stylestext.message_sender}>

                            <div className={stylestext.row}>
                                <div>sender:
                                <div className={stylestext.message_bold}>{item.message_sender}</div>

                                </div>
                            </div>
                        </div>

                        <div className={stylestext.message_channel_body}>
                            <div className={stylestext.row}>
                                <div>channel:
                                <div className={stylestext.message_bold}>{item.message_channel}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={stylestext.message}>
                        {item.message}
                    </div>

                    {timesec(item.message_timestamp )}

                </div>))} */}
        <ChatText result={result} />
        <div ref={messagesEndRef} />
      </div>

      <form className={styles.chat_typing} onSubmit={submitHandler}>
        <input
          ref={inputRef}
          autoComplete="off"
          className={styles.type_input}
          type="text"
          placeholder="Type Here... ( max char:500 )"
          value={chat_text}
          id="chat_text"
          onChange={(e) => {
            let temp_chat_text = e.target.value;
            //console.log(temp_chat_text)
            if (temp_chat_text.length <= 500) {
              set_chat_text(temp_chat_text);
            } else {
              alert("Limit exceeded in Chat Text. No more than 500 char! ");
            }
          }}
        />
        <Button
          variant="contained"
          onClick={clickHandler}
          type="submit"
          className={styles.send_btn}
        >
          <Image
            src={SendImg}
            className={styles.image}
            alt="send Image"
            width="40"
            height="40"
          />
        </Button>
      </form>
    </div>
  );
}

export default ChatSide;
