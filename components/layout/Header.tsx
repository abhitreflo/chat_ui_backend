import styles from "./Header.module.css";
import { useRouter } from "next/router";
import { Button } from "@mui/material";
interface headerProps{
  username:string
}

function Header({username}:headerProps) {
  const router = useRouter();
  return (
    <div className={styles.row}>
      <div className={styles.username}>Welcome, {username}</div>
      <div className={styles.header}>WhosApp</div>

      <Button
        variant="contained"
        className={styles.button}
        color="error"
        onClick={() => {
          router.replace("https://whosapp-auth.vercel.app/");
        }}
      >
        Logout
      </Button>
    </div>
  );
}

export default Header;
