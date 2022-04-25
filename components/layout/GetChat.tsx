import React, { useState } from "react";

function GetChat() {
  //console.log("GetChat");
  Backendless.Data.of("mihir1")
    .find()
    .then(function (result) {
      //console.log("result", result);
      return result;
    })
    .catch(function (error) {
      console.log("error in get chat", error);
      return false;
    });
}

export default GetChat;
