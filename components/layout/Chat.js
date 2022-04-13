import styles from './Chat.module.css';
import SendImg from '../images/send.png';
import Image from 'next/image';
import React, { useRef } from 'react';

function ChatSide() {
    const inputRef = useRef(null);

    const submitHandler = (e) => {
        e.preventDefault();
    };

    const clickHandler = () => {
        console.log(inputRef.current.value);
    };

    return (
        <div className={styles.chat_container}>
            <div className={styles.chat_heading}>Chat will appear here</div>
            <div className={styles.chat_body}>Chat text</div>
            <form className={styles.chat_typing} onSubmit={submitHandler}>
                <input
                    ref={inputRef}
                    className={styles.type_input}
                    type="text"
                    placeholder="Type Here..."
                />
                <button onClick={clickHandler} className={styles.send_btn}>
                    <Image
                        src={SendImg}
                        className={styles.image}
                        alt="Imggg"
                        width="40"
                        height="40"
                    />
                </button>
            </form>
        </div>
    );
}

export default ChatSide;
