import { useState } from 'react';
import styles from './Form.module.css';

export default function Form({ type }: { type: string }) {
  const [formData, setFormData] = useState({
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
    if (!formData.title || !formData.status) {
      throw new Error(`Title and status fields are required.`);
    }
    e.preventDefault();
    console.log('Form data: ', formData);
  }

  if (type === 'search') {
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
        <label htmlFor="title" className={styles.titleWrap}>
          Title:
          <input
            type="text"
            name="title"
            id="title"
            value={formData['title']}
            className={styles.title}
            onChange={handleChange}
          />
        </label>
        <div className={styles.statusDueWrap}>
          <label htmlFor="status" className={styles.statusWrap}>
            Status:
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
          </label>
          <label htmlFor="due" className={styles.dueWrap}>
            Due:
            <input
              type="date"
              name="due"
              id="due"
              value={formData['due']}
              className={styles.due}
              onChange={handleChange}
            />
          </label>
        </div>
      </div>
      <label htmlFor="description" className={styles.descriptionWrap}>
        Description:
        <textarea
          name="description"
          id="description"
          value={formData['description']}
          className={styles.description}
          onChange={handleChange}
        />
      </label>
      <button type="submit" className={styles.submit}>
        {type === 'add'
          ? 'Add Task'
          : type === 'update'
          ? 'Update Task'
          : type === 'search'
          ? 'Search'
          : 'Delete'}
      </button>
    </form>
  );
}

/* created_at?: string; 
    description?: string | null; 
    id?: string;
    status: string; 
    title: string; 
    updated_at?: string | null;
    user_id?: string; due?: string | null; */
