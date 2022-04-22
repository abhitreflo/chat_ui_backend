import React from "react";

interface chatprops {
  channel: string;
  message: string;
  pubOpsProps?: {
    sender: string;
    receiver?: string;
    channel: string;
    message?: string;
  };
}

const ChatText = ({ channel, message, pubOpsProps }: chatprops) => {
  /* var channel = "default",
    message = "Hello, world!"; */
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
    //console.log("hello")
    return true;
  } catch (err) {
    console.log("error in chatpub");
    return false;
  }
};

export default ChatText;
