import { Fragment, useEffect } from 'react';
import Header from '../components/layout/Header';
import styles from './index.module.css';
import ContactSide from '../components/layout/Contacts';
import ChatSide from '../components/layout/Chat';
import SearchIcon from '../components/images/search';
import Dummy_Data from '../components/data/dummy_data';
// import { userActionCreator } from '../components/redux/action-crators/userActionCreators';
// import { useDispatch } from 'react-redux';

function HomePage() {
    return (
        <Fragment>
            <div className={styles.background}>
                <Header />
                <div className={styles.container}>
                    <div className={styles.contact_container}>
                        <div className={styles.contact_heading}>Contacts</div>
                        <div className={styles.search}>
                            <input
                                className={styles.input}
                                type="text"
                                placeholder="Search Your Partner..."
                            />
                            <button className={styles.search_btn}>
                                <SearchIcon />
                            </button>
                        </div>
                        <div className={styles.all_contacts}>
                            {Dummy_Data.map((item) => (
                                <ContactSide
                                    key={item.id}
                                    id={item.id}
                                    name={item.name}
                                />
                            ))}
                        </div>
                    </div>
                    <div className={styles.chat}>
                        <ChatSide />
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default HomePage;
