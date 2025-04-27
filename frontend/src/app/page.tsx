import Tasks from './components/Tasks/Tasks';
import styles from './page.module.css';

export default function Home() {
  return (
    <main className={styles.content}>
      <h1 className={styles.title}>Task Management App</h1>
      <Tasks />
    </main>
  );
}
