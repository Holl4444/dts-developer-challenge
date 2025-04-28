'use client';

import { useState } from 'react';
import Carousel from '../ui/Carousel/Carousel';
import { getPrioLists } from '../../../../services/utils/helpers';
import useFetch from '../../../../services/utils/getData';
import Form from '../ui/Form/Form';
import { ENDPOINTS } from '../../../../services/urlEndpoints';
import { TaskRow } from '../../../../../backend/src/types/database.types';
import styles from './Tasks.module.css';

export default function Tasks() {
  const [tasksUrl, setTasksUrl] = useState(ENDPOINTS.TASKS);
  const [showSearchForm, setShowSearchForm] = useState(false);
  //Only need to specify data as isLoading has a defined type already
  const { data: allTasks, isLoading } = useFetch<TaskRow[] | TaskRow>(tasksUrl);

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
  const taskArray = Array.isArray(allTasks) ? allTasks : [allTasks]
  const taskNo: number = taskArray.length;
  const { highPrio, midPrio, lowPrio } = getPrioLists(taskArray);
  const noHigh = highPrio.length;
  const noMid = midPrio.length;
  const noLow = lowPrio.length;

  return (
    <div>
      <h3 className={styles.totTasks}>Total Tasks: {taskNo}</h3>
      <div className={styles.btnDiv}>
        <button className={styles.addBtn}>Add Task</button>
        <button
          className={styles.searchBtn}
          onClick={() => setShowSearchForm(true)}
        >
          Search Task
        </button>
      </div>
      {showSearchForm && (
        <div className={styles.searchFormContainer}>
          <h3>Search Tasks</h3>
          <Form
            type="search"
            onSuccess={(url = '') => {
              if (url) {
                setTasksUrl(url);
              }
              setShowSearchForm(false);
            }}
          />
          <button
            className={styles.resetBtn}
            onClick={() => {
              setTasksUrl(ENDPOINTS.TASKS); // Reset to default URL
              setShowSearchForm(false);
            }}
          >
            Reset Search
          </button>
        </div>
      )}
      <div className={styles.carouselContainer}>
        {highPrio && highPrio.length > 0 && (
          <div className={styles.carouselDisp}>
            <h2>{noHigh}</h2>
            <Carousel
              slides={highPrio}
              options={{ dragFree: true }}
            />
          </div>
        )}
        {midPrio && midPrio.length > 0 && (
          <div className={styles.carouselDisp}>
            <h2>{noMid}</h2>
            <Carousel slides={midPrio} options={{ dragFree: true }} />
          </div>
        )}
        {lowPrio && lowPrio.length > 0 && (
          <div className={styles.carouselDisp}>
            <h2>{noLow}</h2>
            <Carousel slides={lowPrio} options={{ dragFree: true }} />
          </div>
        )}
      </div>
    </div>
  );
}
