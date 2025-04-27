import { TaskRow } from '../../../../../backend/src/types/database.types';
import styles from './TaskCard.module.css';

export default function TaskCard(
    { task, priority }: {
        task: TaskRow,
        priority: string,
    }
) {
    const classPrio =  priority ===  `high` ? styles.cardHigh :  priority === `mid` ? styles.cardMid : styles.cardLow;
  return (
    <div className={classPrio}>
      <div className={styles.cardLeft}>
        <p>{task.title}</p>
        <p>{task.status}</p>
        <p>{task.due}</p>
      </div>
      <div className={styles.cardRight}>
              <p>{task.description ? task.description : `Description`}</p>
        <div className={styles.btnDiv}>
          <button className={styles.updateBtn}>Update Task</button>
          <button className={styles.delBtn}>DeleteTask</button>
        </div>
      </div>
    </div>
  );
}
