import { useState } from 'react';
import { ENDPOINTS } from '../../../../../services/urlEndpoints';
import styles from './Form.module.css';

export default function Form({
  type,
  onSuccess,
}: {
  type: string;
  taskId?: string;
  onSuccess?: (url: string) => void;
}) {
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    status: '',
    due: '',
    description: '',
  });

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (type !== 'search' && (!formData.title || !formData.status)) {
      throw new Error(`Title and status fields are required.`);
    }

    console.log('Form data: ', formData);

    if (type === 'search') {
      try {
        let url;
        if (formData.id && formData.id.trim() !== '') {
          url = ENDPOINTS.TASKS_BY_ID(formData.id);
        } else {
          url = ENDPOINTS.TASKS;
        }
        if (onSuccess) {
          onSuccess(url);
        }
      } catch (err) {
        console.error(`Search error: `, err);
      }
    }
  }

  //check for type ie add -> create/insert, search -> get etc)
  //check valid info for type ie all info for create
  // if create then also uuid for id and set up a user (would normally get info from a log in)
  //accept form data
  //Format it for server call inc date

  //search
  //If type = search - get this from button name

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.cardLeft}>
        <div className={styles.idTitleWrap}>
          <div className={styles.idWrap}>
            <label htmlFor="id">Id:</label>
            <input
              type="text"
              name="id"
              id="id"
              value={formData['id']}
              className={styles.title}
              onChange={handleChange}
            />
          </div>
          <div className={styles.titleWrap}>
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              name="title"
              id="title"
              value={formData['title']}
              className={styles.title}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className={styles.statusDueWrap}>
          <div className={styles.statusWrap}>
            <label htmlFor="status"> Status:</label>
            <select
              name="status"
              id="status"
              value={formData['status']}
              className={styles.status}
              onChange={handleChange}
            >
              <option value="">Current Status</option>
              <option value="To do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          <div className={styles.dueWrap}>
            <label htmlFor="due">Due:</label>
            <input
              type="date"
              name="due"
              id="due"
              value={formData['due']}
              className={styles.due}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>

      <div className={styles.cardRight}>
        <div className={styles.descriptionWrap}>
          <label htmlFor="description">Description:</label>

          <textarea
            name="description"
            id="description"
            value={formData['description']}
            className={styles.description}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className={styles.btnDiv}>
        <button type="submit" className={styles.submit}>
          {type === 'add'
            ? 'Add Task'
            : type === 'update'
            ? 'Update Task'
            : type === 'search'
            ? 'Search'
            : 'Delete'}
        </button>
      </div>
    </form>
  );
}

//  created_at?: string;
//     description?: string | null;
//     id?: string;
//     status: string;
//     title: string;
//     updated_at?: string | null;
//     user_id?: string; due?: string | null;
