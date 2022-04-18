import React from 'react'

interface chatprops{
    channel:string,

}

const ChatText=({channel}:chatprops) =>{
    /* var channel = "default",
    message = "Hello, world!"; */

        var subchannel = Backendless.Messaging.subscribe(channel );

        function onMessage( message:Object ) {
            console.log( "Message received in chatsub: " + message )
            }
    try{
        subchannel.addMessageListener( onMessage );
        //console.log("hello")
        return true
    }
    catch( err ) {
        console.log("error in chatsub")
    }
}

export default ChatText