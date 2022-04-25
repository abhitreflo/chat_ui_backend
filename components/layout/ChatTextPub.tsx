import React from "react";

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
    return true;
  } catch (err) {
    console.log("error in chatpub");
    return false;
  }
};

export default ChatText;
