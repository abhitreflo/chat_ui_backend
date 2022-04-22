import React, { useState } from "react";

function GetChat() {
  //const [resultmessages,setResultMessages]=useState([{}])
  console.log("GetChat");
  Backendless.Data.of("mihir1")
    .find()
    .then(function (result) {
      console.log("result", result);
      //resultmessages = result
      //setResultMessages(result)
      return result;
    })
    .catch(function (error) {
      console.log("error in get chat", error);
      return false;
    });
  //return resultmessages
}

export default GetChat;
