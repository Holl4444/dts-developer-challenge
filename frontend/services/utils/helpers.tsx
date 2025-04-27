import TaskCard from '../../src/app/components/TaskCard/TaskCard';
import { TaskRow } from '../../../backend/src/types/database.types';

function getPrioLists (tasks: TaskRow[]) 
{
    const currentDate = Date.now();
    const highPrio: React.ReactNode[] = [];
    const midPrio: React.ReactNode[] = [];
    const lowPrio: React.ReactNode[] = [];

    tasks.forEach(task => {

      let priority = `low`;

      if (task.due) {
        const dueDate = new Date(task.due).getTime();
        const daysDiff = (dueDate - currentDate) / (1000 * 60 * 60 * 24);

          if (daysDiff < 3) {
              priority = `high`; 
              highPrio.push(<TaskCard task={task} priority={priority} />);
              return;
          }
          if (daysDiff < 7) {
            priority = `mid`;
            midPrio.push(<TaskCard task={task} priority={priority} />);
            return;
          }
        priority = `low`;
        lowPrio.push(<TaskCard task={task} priority={priority} />);
        return;
      }
      lowPrio.push(<TaskCard task={task} priority={priority} />);
    });

    return { highPrio, midPrio, lowPrio }
}

 
export { getPrioLists };