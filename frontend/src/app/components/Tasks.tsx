'use client';

import useFetch from '../../../services/getData';
import { v4 as uuid } from 'uuid';
import { ENDPOINTS } from '../../../services/urlEndpoints';
import { TaskRow } from '../../../../backend/src/types/database.types';

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
  return (
    <ul>
      {allTasks.map((task) => (
        <li key={uuid()}>{task.title}</li>
      ))}
    </ul>
  );
}
