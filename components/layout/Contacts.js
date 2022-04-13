import styles from './Contacts.module.css';

function ContactSide({ id, name }) {
    const onClick = (e) => {
        console.log(e.target.textContent);
    };

    return (
        <button onClick={onClick} className={styles.contact_btn}>
            <div className={styles.contacts}>
                <div className={styles.name}>{name}</div>
            </div>
        </button>
    );
}

export default ContactSide;
