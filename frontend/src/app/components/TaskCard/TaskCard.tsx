import { TaskRow } from '../../../../../backend/src/types/database.types';
import { formatDueDate } from '../../../../services/utils/helpers';
import styles from './TaskCard.module.css';

export default function TaskCard(
    { task, priority }: {
        task: TaskRow,
        priority: string,
    }
) {
    
  const formattedDate = formatDueDate(task.due);
  const classPrio = priority === `high` ? styles.cardHigh : priority === `mid` ? styles.cardMid : styles.cardLow;
  
  return (
    <div className={classPrio}>
      <div className={styles.cardLeft}>
        <div className={styles.titleWrap}>
          <label htmlFor="title">Title:</label>
          <p className={styles.title} id="title">
            {task.title}
          </p>
        </div>
        <div className={styles.statusDueWrap}>
          <div className={styles.statusWrap}>
            <label htmlFor="status">Status</label>
            <p className={styles.status} id="status">
              {task.status}
            </p>
          </div>
          <div className={styles.dueWrap}>
            <label htmlFor="due">Due: </label>
            <p className={styles.due} id="due">
              {formattedDate}
            </p>
          </div>
        </div>
      </div>

      <div className={styles.cardRight}>
        <div className={styles.descriptionWrap}>
          <label htmlFor="description">Description:</label>
          <p className={styles.description} id="description">
            {task.description ? task.description : `Description`}
          </p>
        </div>
        <div className={styles.bottomRow}>
          <div className={styles.btnDiv}>
            <button className={styles.updateBtn}>Update Task</button>
            <button className={styles.delBtn}>Delete Task</button>
          </div>
          <p>{task.id}</p>
        </div>
      </div>
    </div>
  );
}
