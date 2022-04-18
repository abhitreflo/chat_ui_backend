import { Fragment, useEffect, useRef, useState } from 'react';
import Header from '../components/layout/Header';
import styles from './index.module.css';
import ContactSide from '../components/layout/Contacts';
import ChatSide from '../components/layout/Chat';
//import SearchIcon from '../components/images/search';
import Dummy_Data from '../components/data/dummy_data';
import { Dummy_Data_Search } from '../components/data/dummy_data';
// import { userActionCreator } from '../components/redux/action-creators/userActionCreators';
// import { useDispatch } from 'react-redux';
import CancelIcon from '@mui/icons-material/Cancel';
import SearchIcon from '@mui/icons-material/Search';

function HomePage() {
    let search=''
    const [searchWord,setSearchWord]=useState('')
    const [contacts,setContacts] = useState(Dummy_Data)
    const my_ref=useRef<any>(null)
    const [focus,setFocus]=useState(false)
     useEffect(() => {
        //console.log('search { ',searchWord,'}')
        //console.log("search-send",Dummy_Data_Search(searchWord))
        setContacts(Dummy_Data_Search(searchWord))

    },[searchWord])

    /* useEffect(()=>{
        //console.log('focus',focus)
    },[focus]) */

    
    return (
        <Fragment>
            <div className={styles.background}>
                <Header />
                <div className={styles.container}>
                    <div className={styles.contact_container}>
                        <div className={styles.contact_heading}>Contacts</div>
                        <div className={styles.search}>
                            <form className={styles.row} onSubmit={(e)=>{e.preventDefault()
                            console.log("submit")}}>
                            <input
                            onSubmit={(e)=>{e.preventDefault()
                                console.log("submit")}}
                            ref={my_ref}
                                className={styles.input}
                                type="text"
                                autoComplete="off"
                                id={'searchWord'}
                                value={searchWord}
                                placeholder="Search Your Friend..."
                                onChange={(e)=>{
                                    setSearchWord(e.target.value)
                                    if(e.target.value!='')
                                    { 
                                        setFocus(true)
                                    }
                                }}
                                onFocus={()=>
                                    setFocus(true)

                                }
                                onBlur={()=>{
                                    setTimeout(()=>{setFocus(false)},500)}}
                            />
                            <button title={"search"} type="submit" className={styles.search_btn}
                            onClick={(e)=>{
                                e.preventDefault()
                                if(focus===true)
                                {
                                    //console.log("clicked")
                                    setSearchWord("")
                                   // my_ref.current.value('')
                                    //console.log('searchWord{',searchWord,'}')
                                    my_ref.current.blur()

                                    setFocus(false)
                                }
                                else{
                                    my_ref.current.focus()
                                    setFocus(true)
                                }
                            }}>
                            {focus===false?
                                <SearchIcon color='inherit'/>:
                                <CancelIcon color="inherit"/>
                            }
                            </button>
                            </form>
                        </div>
                        <div className={styles.all_contacts}>
                            {contacts.length>0?contacts.map((item) => (
                                <ContactSide
                                    key={item.id}
                                    id={item.id}
                                    name={item.name}
                                />
                            ))
                            :
                            <div className={styles.no_contacts}>No Such Contact starts with {searchWord}</div>}
                        </div>
                    </div>
                    <div className={styles.chat}>
                        <ChatSide channel={"mihir1"} />
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default HomePage;
