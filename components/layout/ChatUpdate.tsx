import React from 'react'

interface objectProps{
    message: string,
    message_sender:string,
    message_timestamp:string,
    message_receiver:string,
    message_channel:string,
}

function ChatUpdate(object:objectProps) {
    try{
        /* Backendless.Messaging.publish( channel, message, pubOps )
        .then( function( response ) {
        })
        .catch( function( error ) {
        }); */
        //console.log("hello")
        console.log("savingMessage...")

        Backendless.Data.of( "mihir1" ).save( object )
        .then( function( savedObject ) {
            console.log("data_saved",savedObject)
        })
        .catch( function( error ) {
            console.log("error",error)
        })



        console.log("checking for new Messages...")

        const personTableRT = Backendless.Data.of( 'mihir1' ).rt();

        const onObjectCreate = (object: object) => console.log( 'Object has been created in the table', object);
        
        const onError = (error:any) => console.log( 'An error has occurred in update-', error);

        personTableRT.addCreateListener( onObjectCreate, onError )

        return true
    }
    catch( err ) {
        console.log("error in chatupdate")
        return false
    }
}

export default ChatUpdate