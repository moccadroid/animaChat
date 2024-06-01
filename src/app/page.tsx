import styles from "./page.module.css";
import Container from "./components/ui/Container";
import ChatContainer from "./components/ChatContainer";

export default function Home() {
  return (
    <main className={styles.main}>
      <ChatContainer />
    </main>
  );
}
