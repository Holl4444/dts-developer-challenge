'use client';

import Carousel from '../ui/Carousel/Carousel';
import { getPrioLists } from '../../../../services/utils/helpers';
import useFetch from '../../../../services/utils/getData';
import { ENDPOINTS } from '../../../../services/urlEndpoints';
import { TaskRow } from '../../../../../backend/src/types/database.types';
import styles from './Tasks.module.css';

export default function Tasks() {
  //Only neewd to specify data as isLoading has a defined type already
  const { data: allTasks, isLoading } = useFetch<TaskRow[]>(
    ENDPOINTS.TASKS
  );

  if (isLoading) {
    return <h2>Loading ...</h2>;
  }
  if (!allTasks) {
    return (
      <div>
        <h2>Data not found</h2>
      </div>
    );
  
  }

  const taskNo: number = allTasks.length;
  const { highPrio, midPrio, lowPrio } = getPrioLists(allTasks);

  return (
    <div>
      <h3>Total Tasks: {taskNo}</h3>
      <div className={styles.carouselContainer}>
        {highPrio && (
          <Carousel slides={highPrio} options={{ dragFree: true }} />
        )}
        {midPrio && (
          <Carousel slides={midPrio} options={{ dragFree: true }} />
        )}
        {lowPrio && (
          <Carousel slides={lowPrio} options={{ dragFree: true }} />
        )}
      </div>
      <div className={styles.btnDiv}>
        <button className={styles.addBtn}>Add Task</button>
        <button className={styles.searchBtn}>Search Task</button>
      </div>
    </div>
  );
}
