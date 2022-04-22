import { Fragment, useEffect, useRef, useState } from "react";
import Header from "../components/layout/Header";
import styles from "./index.module.css";
import ContactSide from "../components/layout/Contacts";
import ChatSide from "../components/layout/Chat";
//import SearchIcon from '../components/images/search';
import Dummy_Data from "../components/data/dummy_data";
import { Dummy_Data_Search } from "../components/data/dummy_data";
// import { userActionCreator } from '../components/redux/action-creators/userActionCreators';
// import { useDispatch } from 'react-redux';
import CancelIcon from "@mui/icons-material/Cancel";
import SearchIcon from "@mui/icons-material/Search";
import { style } from "@mui/system";
import Image from "next/image";
import { Button, Skeleton } from "@mui/material";
import router from "next/router";
import Loading from '../components/loading/loading'

let loadingGif = require("../assets/loadinggif.gif")
let sadGif = require("../assets/sad_giphy2.webp")
var createHost = require("cross-domain-storage/host");

var createGuest = require("cross-domain-storage/guest");

function HomePage() {
  let search = "";
  const [channel, setChannel] = useState("Channel_1");
  const [searchWord, setSearchWord] = useState("");
  const [contacts, setContacts] = useState(Dummy_Data);
  const my_ref = useRef<any>(null);
  const [focus, setFocus] = useState(false);
  useEffect(() => {
    //console.log('search { ',searchWord,'}')
    //console.log("search-send",Dummy_Data_Search(searchWord))
    setContacts(Dummy_Data_Search(searchWord));
  }, [searchWord]);

  /* useEffect(()=>{
        //console.log('focus',focus)
    },[focus]) */
  /* const */
  const [checkGuest, setCheckGuest] = useState(true);

  //useEffect(() => {
  /* var storageHost = createHost([
      {
        origin: "https://chat-ui-backend.vercel.app/",
        allowedMethods: ["get", "set", "remove"],
      },
      {
        origin: "https://whosapp-auth.vercel.app/chat",
        allowedMethods: ["get", "set", "remove"],
      },
      {
        origin: "http://localhost:3000",
        allowedMethods: ["get", "set", "remove"],
      },
    ]); */
  /* console.log("executing guest command");

    if (checkGuest === true) {
      var bazStorage = createGuest("https://whosapp-auth.vercel.app/chat");

      bazStorage.get("Backendless", function (error: any, value: any) {
        // value for the key of 'fizz' will be retrieved from localStorage on www.baz.com
        try {
          console.log("from Backendless try value: ", value);
        } catch {
          console.log("from backendless catch error: ", error);
        }
      }); */

  //setCheckGuest(false);  }

  // }, []);

  const [v, setv] = useState({ name: "", stayLoggedIn: false ,loading:true});
  //const [vname, setvname] = useState("");

  const [load, setLoad] = useState(true);

  useEffect(() => {
    if (load === true) {
      console.log("loaded", load);
      funload();
    }
    setLoad(false);
  }, [v, load]);

  useEffect(()=>{
    //console.log(v)
  },[v])

  const funload = () => {
    var bazStorage = createGuest("https://whosapp-auth.vercel.app/chat");
    bazStorage.get("Backendless", function (error: any, value: any) {
      // value for the key of 'fizz' will be retrieved from localStorage on www.baz.com
      if (error) {
        console.log(error);
      } else {
        //console.log(value);
        value = JSON.parse(value);
        console.log('value:"',value,'"')
        if (value===null)
        { setv({...v,loading:false})
          
          return
        }
        else{
          value.loading = false;
        //console.log(value);
        //console.log(typeof value)
        setv(value);
        //setvname(JSON. parse(value).name)
        /* value = JSON.parse(value);
         console.log(value)
        console.log(typeof value)
        console.log(value.name) */
        }
        
      }
    });
  };
  //setCheckGuest(false);

  if (v.loading ===true ){
    return (<div className={styles.background}>
      <div className={styles.auth_container_2}>
        {/* <div >You are not logged in! </div> */}
        {/* <Image src={loadingGif} alt={'sad_face'} width="500" height="255"></Image> */}
        <Skeleton variant="rectangular" animation="pulse" width={'100%'} height={'100%'} >
         </Skeleton> 
         {/* <div className={styles.loading}>Loading...</div> */}
         <Loading></Loading>
          
        {/* <div>Please Login to Chat</div>
        <Button className={styles.button}
        variant="contained"
      
        color="error"
        onClick={() => {
          router.replace("https://whosapp-auth.vercel.app/");
        }}>Login</Button> */}
        
      </div>

    </div>
    )
  }
  else if (v.stayLoggedIn === false) {
    console.log("Please login")
    
    return (
      <div className={styles.background}>
        <div className={styles.auth_container}>
          <div >You are not logged in! </div>
          <Image src={sadGif} alt={'sad_face'} width="100%" height="100%"></Image>
          <div>Please Login to Chat</div>
          <Button className={styles.button}
          variant="contained"
        
          color="error"
          onClick={() => {
            router.replace("https://whosapp-auth.vercel.app/");
          }}>Login</Button>
        </div>

      </div>
    )
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
                    //console.log("submit")
                  }}
                >
                  <input
                    onSubmit={(e) => {
                      e.preventDefault();
                      //console.log("submit")
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
                      //console.log('pressed submit')
                      e.preventDefault();
                      if (focus === true) {
                        //console.log("clicked")
                        setSearchWord("");
                        // my_ref.current.value('')
                        //console.log('searchWord{',searchWord,'}')
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
                  contacts.map((item) => (
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
