import React, { Fragment, ReactElement } from "react";
import stylestext from "./ChatText.module.css";
interface messageProps {
  result?: any;
  message?: string;
  message_timestamp?: string;
  message_sender?: string;
  message_receiver?: string;
  message_channel?: string;
  created?: number;
}
const ChatText: (i: messageProps) => ReactElement<any, any> = (
  i: messageProps
) => {
  const r = i.result;

  const timesec = (props: string) => {
    var offset = 5.5;
    var timeEpoch = parseInt(props);
    var d = new Date(timeEpoch);
    var utc = d.getTime() + d.getTimezoneOffset() * 60000;
    var nd = new Date(utc + 3600000 * offset);
    const datetime = nd.toLocaleString().split(', ');

    return (
      <div className={stylestext.column}>
        <div className={stylestext.message_details}>
          <div className={stylestext.row}>
            <div>
              date:
              <div className={stylestext.message_bold}>
                {datetime[0]}
              </div>
            </div>
          </div>
        </div>

        <div className={stylestext.message_details}>
          <div className={stylestext.row}>
            <div>
              time:
              <div className={stylestext.message_bold}>
                {datetime[1]}
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
