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
  const noHigh = highPrio.length;
  const noMid = midPrio.length;
  const noLow = lowPrio.length;

  return (
    <div>
      <h3 className={styles.totTasks}>Total Tasks: {taskNo}</h3>
      <div className={styles.btnDiv}>
        <button className={styles.addBtn}>Add Task</button>
        <button className={styles.searchBtn}>Search Task</button>
      </div>
      <div className={styles.carouselContainer}>
        {highPrio && (
          <div className={styles.carouselDisp}>
            <h2>{noHigh}</h2>
            <Carousel
              slides={highPrio}
              options={{ dragFree: true }}
            />
          </div>
        )}
        {midPrio && (
          <div className={styles.carouselDisp}>
            <h2>{noMid}</h2>
            <Carousel slides={midPrio} options={{ dragFree: true }} />
          </div>
        )}
        {lowPrio && (
          <div className={styles.carouselDisp}>
            <h2>{noLow}</h2>
            <Carousel slides={lowPrio} options={{ dragFree: true }} />
          </div>
        )}
      </div>
    </div>
  );
}
