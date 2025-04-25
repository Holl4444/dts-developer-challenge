// New version of error boundaries for app router. Recieves 2 objects, error and reset.
'use client';

import { useEffect } from 'react';
import styles from './error.module.css';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
    console.error(error);
    }, [error]);

    return (
      <main className={styles.errorStructure}>
        <div className={styles.errorFlex}>
          <h2>{error.message}</h2>
          <button onClick={reset}>Try again</button>
        </div>
      </main>
    );
}