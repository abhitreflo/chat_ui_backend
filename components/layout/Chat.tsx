import styles from "./Chat.module.css";
import SendImg from "../images/send.png";
import Image from "next/image";
import React, { useCallback, useEffect, useRef, useState } from "react";
import ChatTextPub from "./ChatTextPub";
import ChatUpdate from "./ChatUpdate";
import ChatText from "./ChatText";

import { Button } from "@mui/material";

interface chat_channel_props {
  channel: string;
  username: string;
}

function ChatSide({ channel, username }: chat_channel_props) {
  const inputRef = useRef<any>();
  const [chat_text, set_chat_text] = useState("");
  const [messageObject, setMessageObject] = useState<any>();
  const [sub, setSub] = useState(true);
  const [messageId, setMessageId] = useState("");
  const [result, setResult] = useState<any>([]);
 /*  const chat_update = useCallback(() => {
    ChatUpdate({
      message: messageObject?.message,
      message_sender: messageObject?.headers.sender,
      message_timestamp: messageObject?.timestamp,
      message_receiver: messageObject?.headers.receiver,
      message_channel: messageObject?.headers.channel,
    });
  }, [messageObject]); */

  useEffect(() => {
    setTimeout(() => {
      Backendless.Data.of(channel)
        .find()
        .then(function (result) {
          result.sort(function (x: any, y: any) {
            return x?.message_timestamp - y?.message_timestamp;
          });
          setResult(result);
          return result;
        })
        .catch(function (error) {
          console.log("error in get chat", error);
          return false;
        });
    }, 500);
  }, [channel]);

  useEffect(() => {
    if (sub) {
      setSub(false);
      var subchannel = Backendless.Messaging.subscribe(channel);

      subchannel.addMessageListener(onMessage);
    }
    function onMessage(pubsubmessage: object) {
      setMessageObject(pubsubmessage);
      setSub(false);
    }
  }, [channel, sub]);

  useEffect(() => {
    if (messageObject && messageId != messageObject.messageId) {
      /* setTimeout(chat_update, 300); */
      setSub(true);
      setMessageId(messageObject.messageId);

      setTimeout(() => {
        Backendless.Data.of(channel)
          .find()
          .then(function (result) {
            result.sort(function (x: any, y: any) {
              return x?.message_timestamp - y?.message_timestamp;
            });

            setResult(result);
            return result;
          })
          .catch(function (error) {
            return false;
          });
      }, 500);
    }
  }, [channel, messageId, /* chat_update, */ messageObject]);

  useEffect(() => {
    if (sub) {
      setSub(false);
      var subchannel = Backendless.Messaging.subscribe(channel);

      subchannel.addMessageListener(onMessage);
    }
    function onMessage(pubsubmessage: object) {
      setMessageObject(pubsubmessage);
      setSub(false);
    }

    {
      Backendless.Data.of(channel)
        .find()
        .then(function (result) {
          result.sort(function (x: any, y: any) {
            return x?.message_timestamp - y?.message_timestamp;
          });

          setResult(result);
          return result;
        })
        .catch(function (error) {
          console.log("error in get chat", error);
          return false;
        });
    }
  }, [channel, sub]);

  const submitHandler = (e: any) => {
    console.log(chat_text, "submitted");
    e.preventDefault();
    if (chat_text === "") {
      console.log("Empty message cannot be sent!:(");
      console.log("returning...");
      return;
    }
    ChatTextPub({
      channel: channel,
      message: chat_text,
      pubOpsProps: { sender: username, channel: channel },
    });

    var subchannel = Backendless.Messaging.subscribe(channel);

    function onMessage(pubsubmessage: object) {
      setMessageObject(pubsubmessage);
    }

    subchannel.addMessageListener(onMessage);

    setTimeout(() => {
      set_chat_text("");
    }, 250);
  };

  const clickHandler = () => {
    console.log("clicked");
    if (inputRef?.current?.value != "") {
      console.log(inputRef?.current?.value);
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
