import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import Header from "../components/layout/Header";
import styles from "./index.module.css";
import ContactSide from "../components/layout/Contacts";
import ChatSide from "../components/layout/Chat";
import Channels from "../components/data/Channels";
import { Channels_Search } from "../components/data/Channels";
import CancelIcon from "@mui/icons-material/Cancel";
import SearchIcon from "@mui/icons-material/Search";
import { style } from "@mui/system";
import Image from "next/image";
import { Button, Skeleton } from "@mui/material";
import router from "next/router";
import Loading from "../components/loading/loading";

let loadingGif = require("../assets/loadinggif.gif");
let sadGif = require("../assets/sad_giphy2.webp");
var createHost = require("cross-domain-storage/host");

var createGuest = require("cross-domain-storage/guest");

function HomePage() {
  let search = "";
  const [channel, setChannel] = useState("Channel_1");
  const [searchWord, setSearchWord] = useState("");
  const [contacts, setContacts] = useState(Channels);
  const my_ref = useRef<any>(null);
  const [focus, setFocus] = useState(false);

  useEffect(() => {
    setContacts(Channels_Search(searchWord));
  }, [searchWord]);

  const [v, setv] = useState({ name: "", stayLoggedIn: false, loading: true });

  const [load, setLoad] = useState(true);

  const funload = useCallback(() => {
    var bazStorage = createGuest("https://whosapp-auth.vercel.app/chat");
    bazStorage.get("Backendless", function (error: any, value: any) {
      try {
        value = JSON.parse(value);

        if (value === null) {
          setv({ ...v, loading: false });
          return;
        } else {
          value.loading = false;

          setv(value);
        }
      }catch (error) {
        console.log(error);
      }
    });
  }, [v]);

  useEffect(() => {
    if (load === true) {

      funload();
    }
    setLoad(false);
  }, [v, load, funload]);

  if (v.loading === true) {
    return (
      <div className={styles.background}>
        <div className={styles.auth_container_2}>
          <Skeleton
            variant="rectangular"
            animation="pulse"
            width={"100%"}
            height={"100%"}
          ></Skeleton>

          <Loading></Loading>
        </div>
      </div>
    );
  } else if (v.stayLoggedIn === false) {
    console.log("Please login");

    return (
      <div className={styles.background}>
        <div className={styles.auth_container}>
          <div>You are not logged in! </div>
          <Image
            src={sadGif}
            alt={"sad_face"}
            width="100%"
            height="100%"
          ></Image>
          <div>Please Login to Chat</div>
          <Button
            className={styles.button}
            variant="contained"
            color="error"
            onClick={() => {
              router.replace("https://whosapp-auth.vercel.app/");
            }}
          >
            Login
          </Button>
        </div>
      </div>
    );
  }

  return (
    <Fragment>
      <div className={styles.background}>
        <Header username={v.name} />
        <div className={styles.container}>
          <div className={styles.contact_container}>
            <div className={styles.contact_heading}>Channels</div>
            <div className={styles.search}>
              <form
                className={styles.row}
                onSubmit={(e) => {
                  e.preventDefault();
                }}
              >
                <input
                  onSubmit={(e) => {
                    e.preventDefault();
                  }}
                  ref={my_ref}
                  className={styles.input}
                  type="text"
                  autoComplete="off"
                  id={"searchWord"}
                  value={searchWord}
                  placeholder="Search Your Channel..."
                  onChange={(e) => {
                    setSearchWord(e.target.value);
                    if (e.target.value != "") {
                      setFocus(true);
                    }
                  }}
                  onFocus={() => setFocus(true)}
                  onBlur={() => {
                    setTimeout(() => {
                      setFocus(false);
                    }, 500);
                  }}
                />
                <button
                  title={"search"}
                  type="submit"
                  className={styles.search_btn}
                  onClick={(e) => {
                    e.preventDefault();
                    if (focus === true) {
                      setSearchWord("");

                      my_ref.current.blur();

                      setFocus(false);
                    } else {
                      my_ref.current.focus();
                      setFocus(true);
                    }
                  }}
                >
                  {focus === false ? (
                    <SearchIcon color="inherit" />
                  ) : (
                    <CancelIcon color="inherit" />
                  )}
                </button>
              </form>
            </div>

            <div className={styles.all_contacts}>
              {focus ? <div>Press enter to cancel search</div> : <></>}
              {contacts.length > 0 ? (
                contacts.map((item: any) => (
                  <ContactSide
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    setChannel={setChannel}
                    channel={channel}
                  />
                ))
              ) : (
                <div className={styles.no_contacts}>
                  No Such Contact starts with {searchWord}
                </div>
              )}
            </div>
          </div>
          <div className={styles.chat}>
            <ChatSide channel={channel} username={v?.name} />
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default HomePage;
