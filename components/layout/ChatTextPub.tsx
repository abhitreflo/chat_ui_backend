import React from "react";
import ChatUpdate from './ChatUpdate';
interface chatProps {
  channel: string;
  message: string;
  pubOpsProps?: {
    sender: string;
    receiver?: string;
    channel: string;
    message?: string;
  };
}

const ChatText = ({ channel, message, pubOpsProps }: chatProps) => {
  const pubOps = new Backendless.PublishOptions({
    headers: {
      sender: pubOpsProps?.sender,
      receiver: pubOpsProps?.receiver,
      channel: pubOpsProps?.channel,
    },
  });
  try {
    Backendless.Messaging.publish(channel, message, pubOps)
      .then(function (response) {})
      .catch(function (error) {});
      console.log('published changes')
      console.log('pubOps:',pubOps)
      console.log('pubOps.heaDERS:',pubOps.headers)
      console.log('new date:',new Date())

      ChatUpdate({
        message: message,
        message_sender: pubOpsProps?.sender,
        message_timestamp: new Date().getTime(),
        message_receiver: pubOpsProps?.receiver,
        message_channel: channel,
      }) 
    return true;
  } catch (err) {
    console.log("error in chatpub");
    return false;
  }
};

export default ChatText;
