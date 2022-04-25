import React from "react";

interface chatprops {
  channel: string;
}

const ChatText = ({ channel }: chatprops) => {
  var subchannel = Backendless.Messaging.subscribe(channel);

  function onMessage(message: Object) {
    console.log("Message received in chatsub: " + message);
  }
  try {
    subchannel.addMessageListener(onMessage);

    return true;
  } catch (err) {
    console.log("error in chatsub");
  }
};

export default ChatText;
