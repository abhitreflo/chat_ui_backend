import React from 'react'
interface messageProps{
    message?: string,
    message_timestamp?:string,
    message_sender?:string,
    message_receiver?:string,
    message_channel?:string,
}
function ChatText(message:messageProps) {
  return (
    <div>
      {message.message}
    </div>
  )
}

export default ChatText
