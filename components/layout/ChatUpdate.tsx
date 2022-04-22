import React from "react";
import GetChat from "./GetChat";

interface objectProps {
  message: string;
  message_sender: string;
  message_timestamp: string;
  message_receiver: string;
  message_channel: string;
}

function ChatUpdate(object: objectProps) {
  try {
    /* Backendless.Messaging.publish( channel, message, pubOps )
        .then( function( response ) {
        })
        .catch( function( error ) {
        }); */
    //console.log("hello")
    console.log("savingMessage...");

    Backendless.Data.of(object.message_channel)
      .save(object)
      .then(function (savedObject) {
        console.log("data_saved", savedObject);
      })
      .catch(function (error) {
        console.log("error", error);
      });

    //console.log("checking for new Messages...");

    /* GetChat() */

    /* const personTableRT = Backendless.Data.of( 'mihir1' ).rt();

        const onObjectCreate = (object: object) => console.log( 'Object has been created in the table', object);
        
        const onError = (error:any) => console.log( 'An error has occurred in update-', error);

        setTimeout(personTableRT.addCreateListener( onObjectCreate, onError ),500)
*/
    return true;
  } catch (err) {
    console.log("error in chat update");
    return false;
  }
}

export default ChatUpdate;
