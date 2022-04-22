import React, { Fragment, ReactElement } from "react";
import stylestext from "./ChatText.module.css";
interface messageProps {
  /* item:{ */
  result?: any;

  message?: string;
  message_timestamp?: string;
  message_sender?: string;
  message_receiver?: string;
  message_channel?: string;
  created?: number;
  /* } */
}
const ChatText: (i: messageProps) => ReactElement<any, any> = (
  i: messageProps
) => {
  //console.log("item in chat text", i);
  //console.log("result in chat text", i?.result);
  const r = i.result;

  const timesec = (props: string) => {
    /* var utcSeconds = parseInt(props);
    var d = new Date(0); // The 0 there is the key, which sets the date to the epoch
    d.setUTCSeconds(utcSeconds);
    console.log('d=',d) */
    var offset = 5.5;
    var timeEpoch = parseInt(props);
    var d = new Date(timeEpoch);
    var utc = d.getTime() + d.getTimezoneOffset() * 60000; //This converts to UTC 00:00
    var nd = new Date(utc + 3600000 * offset);
    //return nd.toLocaleString();
    //return <div>{(parseInt(props)).toUTCString()}</div>
    return (
      <div className={stylestext.column}>
        <div className={stylestext.message_details}>
          <div className={stylestext.row}>
            <div>
              date:
              <div className={stylestext.message_bold}>
                {nd.toLocaleString().toString().substring(0, 9)}
              </div>
            </div>
          </div>
        </div>

        <div className={stylestext.message_details}>
          <div className={stylestext.row}>
            <div>
              time:
              <div className={stylestext.message_bold}>
                {nd.toLocaleString().toString().substring(10)}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      {r &&
        r.map((i: any) => {
          //console.log('inside chatText component in chat text');
          return (
            <div className={stylestext.message_body} key={i?.objectId}>
              <div className={stylestext.column}>
                <div className={stylestext.message_details}>
                  <div className={stylestext.row}>
                    <div>
                      sender:
                      <div className={stylestext.message_bold}>
                        {i?.message_sender}
                      </div>
                    </div>
                  </div>
                </div>

                <div className={stylestext.message_details}>
                  <div className={stylestext.row}>
                    <div>
                      channel:
                      <div className={stylestext.message_bold}>
                        {i?.message_channel}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={stylestext.message}>{i?.message}</div>

              {timesec(i.message_timestamp)}
            </div>
          );
        })}
    </div>
  );
};

export default ChatText;
